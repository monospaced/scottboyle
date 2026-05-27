const { fetchWithTimeout } = require("../../src/scripts/fetch");

const {
  FETCH_TIMEOUT_MS,
  FEED_URL,
  MAX_LINKS,
  USER_AGENT,
} = require("./linklog-config");
const {
  readLinklogSnapshot,
  writeLinklogSnapshot,
} = require("./linklog-store");

const normalizeLinks = json => {
  if (!Array.isArray(json)) {
    throw new Error("Expected JSON array");
  }

  if (json.length === 0) {
    throw new Error("Expected non-empty JSON array");
  }

  return json.slice(0, MAX_LINKS);
};

const fetchPinboardLinks = async () => {
  const res = await fetchWithTimeout(FEED_URL, FETCH_TIMEOUT_MS, USER_AGENT);

  if (!res.ok) {
    throw new Error(res.statusText || `HTTP ${res.status}`);
  }

  const json = await res.json();

  return normalizeLinks(json);
};

const loadLinklogData = async event => {
  try {
    const links = await fetchPinboardLinks();
    const fetchedAt = new Date().toISOString();

    try {
      await writeLinklogSnapshot(event, { fetchedAt, links });
    } catch (err) {
      // Live data should still be served even if snapshot persistence fails.
    }

    return {
      fetchedAt,
      links,
      source: "live",
    };
  } catch (liveError) {
    const snapshot = await readLinklogSnapshot(event);

    if (snapshot) {
      return {
        fetchedAt: snapshot.fetchedAt,
        links: snapshot.links,
        source: "snapshot",
      };
    }

    throw liveError;
  }
};

module.exports = {
  fetchPinboardLinks,
  loadLinklogData,
  normalizeLinks,
};
