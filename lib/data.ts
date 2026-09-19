import { and, asc, desc, eq, gte, notInArray } from "drizzle-orm";
import { getDb } from "@/db";
import {
  bibliography,
  eventRecords,
  events,
  publications,
} from "@/db/schema";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export async function getUpcomingEvents(limit?: number) {
  try {
    const query = getDb()
      .select()
      .from(events)
      .where(
        and(
          gte(events.date, today()),
          notInArray(events.status, ["completed", "cancelled"]),
        ),
      )
      .orderBy(asc(events.date));
    return limit ? await query.limit(limit) : await query;
  } catch {
    return [];
  }
}

export async function getCompletedEvents() {
  try {
    return await getDb()
      .select()
      .from(events)
      .where(eq(events.status, "completed"))
      .orderBy(desc(events.date));
  } catch {
    return [];
  }
}

export async function getAllEvents() {
  try {
    return await getDb().select().from(events).orderBy(asc(events.date));
  } catch {
    return [];
  }
}

export async function getRecords() {
  try {
    return await getDb()
      .select()
      .from(eventRecords)
      .orderBy(desc(eventRecords.date));
  } catch {
    return [];
  }
}

export async function getRecordBySlug(slug: string) {
  try {
    return (
      await getDb()
        .select()
        .from(eventRecords)
        .where(eq(eventRecords.slug, slug))
        .limit(1)
    )[0];
  } catch {
    return undefined;
  }
}

export async function getBibliography() {
  try {
    return await getDb()
      .select()
      .from(bibliography)
      .orderBy(asc(bibliography.author), asc(bibliography.title));
  } catch {
    return [];
  }
}

export async function getApprovedPublications(limit?: number) {
  try {
    const query = getDb()
      .select()
      .from(publications)
      .where(eq(publications.status, "approved"))
      .orderBy(desc(publications.publishedAt));
    return limit ? await query.limit(limit) : await query;
  } catch {
    return [];
  }
}

export async function getPublicationBySlug(slug: string) {
  try {
    return (
      await getDb()
        .select()
        .from(publications)
        .where(
          and(eq(publications.slug, slug), eq(publications.status, "approved")),
        )
        .limit(1)
    )[0];
  } catch {
    return undefined;
  }
}
