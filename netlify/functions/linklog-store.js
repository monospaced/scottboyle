const { connectLambda, getStore } = require("@netlify/blobs");

const { SNAPSHOT_KEY, SNAPSHOT_STORE_NAME } = require("./linklog-config");

const isValidSnapshot = value =>
  Boolean(
    value &&
      typeof value.fetchedAt === "string" &&
      Array.isArray(value.links) &&
      value.links.length > 0,
  );

const getLinklogStore = event => {
  connectLambda(event);

  return getStore(SNAPSHOT_STORE_NAME);
};

const readLinklogSnapshot = async event => {
  try {
    const store = getLinklogStore(event);
    const snapshot = await store.get(SNAPSHOT_KEY, { type: "json" });

    return isValidSnapshot(snapshot) ? snapshot : null;
  } catch (err) {
    return null;
  }
};

const writeLinklogSnapshot = async (event, snapshot) => {
  const store = getLinklogStore(event);

  await store.setJSON(SNAPSHOT_KEY, snapshot);
};

module.exports = {
  readLinklogSnapshot,
  writeLinklogSnapshot,
};
