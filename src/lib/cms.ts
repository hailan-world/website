import "server-only";

import { headers } from "next/headers";
import type { Payload, TypedUser } from "payload";

let payloadPromise: Promise<Payload> | null = null;

/**
 * Return the Payload Local API when this environment has a database and
 * application secret. JSON files remain a read-only fallback for builds and
 * for the period before an environment has been seeded.
 */
export async function getCmsPayload(): Promise<Payload | null> {
  const localCmsEnabled =
    process.env.NODE_ENV === "development" || process.env.PAYLOAD_LOCAL === "true";
  const databaseUri =
    process.env.DATABASE_URI ??
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL;
  if ((!databaseUri || !process.env.PAYLOAD_SECRET) && !localCmsEnabled) {
    return null;
  }

  if (!payloadPromise) {
    payloadPromise = Promise.all([import("payload"), import("@payload-config")]).then(
      ([{ getPayload }, { default: config }]) => getPayload({ config }),
    );
  }

  try {
    return await payloadPromise;
  } catch (error) {
    payloadPromise = null;
    console.error("Payload CMS is unavailable; using the checked-in content fallback.", error);
    return null;
  }
}

/** Validate the current Payload session before allowing draft content. */
export async function getCmsViewer(
  payload: Payload,
): Promise<{ draft: boolean; user: null | TypedUser }> {
  try {
    const requestHeaders = new Headers(await headers());
    const { user } = await payload.auth({ headers: requestHeaders });
    return { draft: Boolean(user), user };
  } catch {
    return { draft: false, user: null };
  }
}
