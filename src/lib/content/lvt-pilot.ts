import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";

export type LvtPilotLocale = "en" | "zh";

export interface LvtPilotContent {
  status: "draft" | "approved";
  title: string;
  category: string;
  headline: string;
  short: string;
  description: string[];
  specs: { label: string; value: string }[];
  formats: string[];
  approvedBy?: string;
  approvalReference?: string;
  sourceNotes?: string;
}

const pilotDirectory = join(process.cwd(), "content", "pilot");

function nonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function stringList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(nonEmptyString);
}

function specsList(
  value: unknown,
): value is Array<{ label: string; value: string }> {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        nonEmptyString((item as Record<string, unknown>).label) &&
        nonEmptyString((item as Record<string, unknown>).value),
    )
  );
}

function parsePilot(value: unknown): LvtPilotContent | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;

  if (
    (item.status !== "draft" && item.status !== "approved") ||
    !nonEmptyString(item.title) ||
    !nonEmptyString(item.category) ||
    !nonEmptyString(item.headline) ||
    !nonEmptyString(item.short) ||
    !stringList(item.description) ||
    item.description.length === 0 ||
    !specsList(item.specs) ||
    !stringList(item.formats)
  ) {
    return null;
  }

  return item as unknown as LvtPilotContent;
}

export function getLvtPilot(locale: LvtPilotLocale): LvtPilotContent | null {
  try {
    const value = JSON.parse(
      readFileSync(join(pilotDirectory, `lvt.${locale}.json`), "utf8"),
    );
    return parsePilot(value);
  } catch {
    return null;
  }
}
