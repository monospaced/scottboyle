import { getStore } from "@netlify/blobs";

import { SNAPSHOT_KEY, SNAPSHOT_STORE_NAME } from "../lib/linklog-config.mjs";

export default async () => {
  const store = getStore(SNAPSHOT_STORE_NAME);
  const snapshot = await store.get(SNAPSHOT_KEY, { type: "json" });

  console.log(
    `Linklog debug read ${SNAPSHOT_STORE_NAME}/${SNAPSHOT_KEY}: ${snapshot ? "present" : "missing"}`,
  );

  return Response.json({
    key: SNAPSHOT_KEY,
    snapshot,
    store: SNAPSHOT_STORE_NAME,
  });
};
