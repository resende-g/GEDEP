import {
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  time,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const eventStatus = pgEnum("event_status", [
  "scheduled",
  "confirmed",
  "completed",
  "cancelled",
  "to_be_defined",
]);

export const publicationStatus = pgEnum("publication_status", [
  "draft",
  "approved",
  "archived",
]);

export const submissionStatus = pgEnum("submission_status", [
  "received",
  "under_review",
  "approved",
  "rejected",
]);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
};

export const events = pgTable(
  "events",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    date: date("date", { mode: "string" }).notNull(),
    startTime: time("start_time"),
    endTime: time("end_time"),
    location: text("location"),
    theme: text("theme"),
    work: text("work"),
    status: eventStatus("status").default("to_be_defined").notNull(),
    ...timestamps,
  },
  (table) => [index("events_date_idx").on(table.date)],
);

export const eventRecords = pgTable(
  "event_records",
  {
    id: serial("id").primaryKey(),
    eventId: integer("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    date: date("date", { mode: "string" }).notNull(),
    location: text("location"),
    theme: text("theme"),
    work: text("work"),
    authors: jsonb("authors").$type<string[]>().default([]).notNull(),
    description: text("description").notNull(),
    content: text("content").notNull(),
    coverImage: text("cover_image"),
    photographs: jsonb("photographs").$type<string[]>().default([]).notNull(),
    posters: jsonb("posters").$type<string[]>().default([]).notNull(),
    materials: jsonb("materials").$type<string[]>().default([]).notNull(),
    links: jsonb("links").$type<string[]>().default([]).notNull(),
    relatedTexts: jsonb("related_texts").$type<string[]>().default([]).notNull(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("event_records_slug_uidx").on(table.slug),
    index("event_records_date_idx").on(table.date),
  ],
);

export const bibliography = pgTable(
  "bibliography",
  {
    id: serial("id").primaryKey(),
    author: text("author").notNull(),
    title: text("title").notNull(),
    year: integer("year"),
    category: text("category").notNull(),
    description: text("description").notNull(),
    whyRead: text("why_read").notNull(),
    readingLevel: text("reading_level").notNull(),
    url: text("url"),
    ...timestamps,
  },
  (table) => [index("bibliography_category_idx").on(table.category)],
);

export const publications = pgTable(
  "publications",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    authors: jsonb("authors").$type<string[]>().default([]).notNull(),
    type: text("type").notNull(),
    summary: text("summary").notNull(),
    content: text("content").notNull(),
    status: publicationStatus("status").default("draft").notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    url: text("url"),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("publications_slug_uidx").on(table.slug),
    index("publications_status_date_idx").on(table.status, table.publishedAt),
  ],
);

export const submissions = pgTable(
  "submissions",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    title: text("title").notNull(),
    contributionType: text("contribution_type").notNull(),
    message: text("message"),
    content: text("content").notNull(),
    fileUrl: text("file_url"),
    fileName: text("file_name"),
    fileType: text("file_type"),
    fileSize: integer("file_size"),
    sourceHash: text("source_hash"),
    status: submissionStatus("status").default("received").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("submissions_status_date_idx").on(table.status, table.createdAt),
    index("submissions_source_date_idx").on(table.sourceHash, table.createdAt),
  ],
);

export type Event = typeof events.$inferSelect;
export type EventRecord = typeof eventRecords.$inferSelect;
export type BibliographyItem = typeof bibliography.$inferSelect;
export type Publication = typeof publications.$inferSelect;
