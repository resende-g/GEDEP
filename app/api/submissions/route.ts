import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { and, count, eq, gte, or } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/db";
import { submissions } from "@/db/schema";
import { CONTRIBUTION_TYPES } from "@/lib/constants";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_REQUEST_SIZE = 6 * 1024 * 1024;
const ALLOWED_FILES = new Map([
  ["pdf", "application/pdf"],
  ["doc", "application/msword"],
  ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  ["odt", "application/vnd.oasis.opendocument.text"],
  ["txt", "text/plain"],
]);

function clean(value: string) {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

const schema = z.object({
  name: z.string().transform(clean).pipe(z.string().min(2).max(120)),
  email: z.string().transform((value) => clean(value).toLowerCase()).pipe(z.string().email().max(254)),
  title: z.string().transform(clean).pipe(z.string().min(3).max(200)),
  contributionType: z.enum(CONTRIBUTION_TYPES),
  message: z.string().transform(clean).pipe(z.string().max(3000)),
  content: z.string().transform(clean).pipe(z.string().min(20).max(100000)),
});

function json(message: string, status: number) {
  return Response.json({ message }, { status, headers: { "Cache-Control": "no-store" } });
}

async function hashSource(request: Request) {
  const source = `${request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "unknown"}|${request.headers.get("user-agent") ?? "unknown"}`;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(source));
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function safeFile(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  const expectedType = ALLOWED_FILES.get(extension);
  if (!expectedType || file.type !== expectedType || file.size > MAX_FILE_SIZE || file.size === 0) return null;
  const base = file.name.slice(0, -(extension.length + 1)).normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "arquivo";
  return { extension, name: `${base}.${extension}`, type: expectedType };
}

function storageClient() {
  const endpoint = process.env.AWS_ENDPOINT_URL_S3;
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  if (!endpoint || !region || !accessKeyId || !secretAccessKey) throw new Error("Storage is not configured.");
  return new S3Client({ endpoint, region, forcePathStyle: true, credentials: { accessKeyId, secretAccessKey } });
}

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    if (!origin || origin !== new URL(request.url).origin) return json("Origem da solicitação não autorizada.", 403);
    if (!request.headers.get("content-type")?.startsWith("multipart/form-data")) return json("Formato de envio inválido.", 415);
    const declaredSize = Number(request.headers.get("content-length") ?? 0);
    if (declaredSize > MAX_REQUEST_SIZE) return json("O envio ultrapassa o limite permitido.", 413);

    const formData = await request.formData();
    if (String(formData.get("website") ?? "")) return json("Contribuição recebida.", 201);

    const parsed = schema.safeParse({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      title: String(formData.get("title") ?? ""),
      contributionType: String(formData.get("contributionType") ?? ""),
      message: String(formData.get("message") ?? ""),
      content: String(formData.get("content") ?? ""),
    });
    if (!parsed.success) return json("Revise os campos e tente novamente.", 400);

    const sourceHash = await hashSource(request);
    const since = new Date(Date.now() - 60 * 60 * 1000);
    const recent = await getDb()
      .select({ total: count() })
      .from(submissions)
      .where(and(gte(submissions.createdAt, since), or(eq(submissions.sourceHash, sourceHash), eq(submissions.email, parsed.data.email))));
    if ((recent[0]?.total ?? 0) >= 3) return json("Limite de envios atingido. Tente novamente mais tarde.", 429);

    const rawFile = formData.get("file");
    let fileUrl: string | null = null;
    let fileName: string | null = null;
    let fileType: string | null = null;
    let fileSize: number | null = null;
    let client: S3Client | null = null;
    const bucket = process.env.SUBMISSIONS_BUCKET;

    if (rawFile instanceof File && rawFile.size > 0) {
      const validated = safeFile(rawFile);
      if (!validated) return json("Arquivo inválido. Use PDF, DOC, DOCX, ODT ou TXT com até 5 MB.", 400);
      if (!bucket) throw new Error("Storage bucket is not configured.");
      client = storageClient();
      fileUrl = `submissions/${new Date().toISOString().slice(0, 7)}/${crypto.randomUUID()}-${validated.name}`;
      fileName = validated.name;
      fileType = validated.type;
      fileSize = rawFile.size;
      await client.send(new PutObjectCommand({ Bucket: bucket, Key: fileUrl, Body: new Uint8Array(await rawFile.arrayBuffer()), ContentType: validated.type, CacheControl: "private, no-store" }));
    }

    try {
      await getDb().insert(submissions).values({
        ...parsed.data,
        message: parsed.data.message || null,
        fileUrl,
        fileName,
        fileType,
        fileSize,
        sourceHash,
        status: "received",
      });
    } catch (error) {
      if (client && bucket && fileUrl) await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: fileUrl })).catch(() => undefined);
      throw error;
    }

    return json("Contribuição recebida. Ela será analisada antes de qualquer publicação.", 201);
  } catch (error) {
    console.error("Submission failed", error instanceof Error ? error.message : "Unknown error");
    return json("Não foi possível registrar a contribuição agora. Tente novamente.", 500);
  }
}
