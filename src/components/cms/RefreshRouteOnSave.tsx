"use client";

import { RefreshRouteOnSave as PayloadRefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RefreshRouteOnSave() {
  const router = useRouter();
  const [serverURL] = useState(() =>
    process.env.NEXT_PUBLIC_SERVER_URL ??
    (typeof window === "undefined" ? "" : window.location.origin),
  );

  if (!serverURL) return null;

  return (
    <PayloadRefreshRouteOnSave
      refresh={() => router.refresh()}
      serverURL={serverURL}
    />
  );
}
