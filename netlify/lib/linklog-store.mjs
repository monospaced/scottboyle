import { getStore } from "@netlify/blobs";

import { SNAPSHOT_KEY, SNAPSHOT_STORE_NAME } from "./linklog-config.mjs";

const isValidSnapshot = value =>
  Boolean(
    value &&
      typeof value.fetchedAt === "string" &&
      Array.isArray(value.links) &&
      value.links.length > 0,
  );

const getLinklogStore = () => getStore(SNAPSHOT_STORE_NAME);

const readLinklogSnapshot = async () => {
  try {
    const store = getLinklogStore();
    const snapshot = await store.get(SNAPSHOT_KEY, { type: "json" });

    return isValidSnapshot(snapshot) ? snapshot : null;
  } catch (err) {
    return null;
  }
};

const writeLinklogSnapshot = async snapshot => {
  const store = getLinklogStore();

  await store.setJSON(SNAPSHOT_KEY, snapshot);
};

export { readLinklogSnapshot, writeLinklogSnapshot };
