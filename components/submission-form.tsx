"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { CONTRIBUTION_TYPES } from "@/lib/constants";

type FormState = { kind: "idle" | "sending" | "success" | "error"; message: string };

export function SubmissionForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<FormState>({ kind: "idle", message: "" });

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ kind: "sending", message: "Enviando contribuição…" });

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        body: new FormData(event.currentTarget),
        headers: { Accept: "application/json" },
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Não foi possível enviar.");

      formRef.current?.reset();
      setState({
        kind: "success",
        message: result.message || "Contribuição recebida. Ela será analisada antes de qualquer publicação.",
      });
    } catch (error) {
      setState({
        kind: "error",
        message: error instanceof Error ? error.message : "Não foi possível enviar. Tente novamente.",
      });
    }
  }

  return (
    <form ref={formRef} className="submission-form" onSubmit={submit} encType="multipart/form-data">
      <div className="honeypot" aria-hidden="true">
        <label>Não preencha este campo<Input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Nome <span aria-hidden="true">*</span></label>
          <Input id="name" name="name" required maxLength={120} autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="email">E-mail <span aria-hidden="true">*</span></label>
          <Input id="email" name="email" type="email" required maxLength={254} autoComplete="email" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="title">Título <span aria-hidden="true">*</span></label>
        <Input id="title" name="title" required maxLength={200} />
      </div>
      <div className="field">
        <label htmlFor="contributionType">Tipo de contribuição <span aria-hidden="true">*</span></label>
        <NativeSelect id="contributionType" name="contributionType" required defaultValue="" className="w-full">
          <NativeSelectOption value="" disabled>Selecione</NativeSelectOption>
          {CONTRIBUTION_TYPES.map((type) => <NativeSelectOption key={type} value={type}>{type}</NativeSelectOption>)}
        </NativeSelect>
      </div>
      <div className="field">
        <label htmlFor="message">Mensagem</label>
        <Textarea id="message" name="message" maxLength={3000} rows={5} />
      </div>
      <div className="field">
        <label htmlFor="content">Texto <span aria-hidden="true">*</span></label>
        <Textarea id="content" name="content" required minLength={20} maxLength={100000} rows={14} />
        <small>Insira o texto em formato simples. Não aceitamos código HTML.</small>
      </div>
      <div className="field">
        <label htmlFor="file">Arquivo</label>
        <Input id="file" name="file" type="file" accept=".pdf,.doc,.docx,.odt,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.oasis.opendocument.text,text/plain" />
        <small>PDF, DOC, DOCX, ODT ou TXT. Tamanho máximo: 5 MB.</small>
      </div>
      <p className="form-note">Ao enviar, a contribuição recebe o status <strong>received</strong>. Nenhum conteúdo é publicado automaticamente.</p>
      <Button className="button h-auto rounded-none" type="submit" disabled={state.kind === "sending"}>
        {state.kind === "sending" ? "Enviando…" : "Enviar contribuição"}
      </Button>
      {state.kind !== "idle" && state.kind !== "sending" ? (
        <div className={`form-status form-status-${state.kind}`} role={state.kind === "error" ? "alert" : "status"}>{state.message}</div>
      ) : null}
    </form>
  );
}
