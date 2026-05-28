import fetchModule from "../../src/scripts/fetch.js";

import {
  FETCH_TIMEOUT_MS,
  FEED_URL,
  MAX_LINKS,
  USER_AGENT,
} from "./linklog-config.mjs";
import { readLinklogSnapshot, writeLinklogSnapshot } from "./linklog-store.mjs";

const { fetchWithTimeout } = fetchModule;

const createLinklogDataLoader = ({
  delay = FETCH_TIMEOUT_MS,
  feedUrl = FEED_URL,
  maxLinks = MAX_LINKS,
  now = () => new Date().toISOString(),
  readSnapshot = readLinklogSnapshot,
  request = fetchWithTimeout,
  userAgent = USER_AGENT,
  writeSnapshot = writeLinklogSnapshot,
} = {}) => {
  const normalizeLinks = json => {
    if (!Array.isArray(json)) {
      throw new Error("Expected JSON array");
    }

    if (json.length === 0) {
      throw new Error("Expected non-empty JSON array");
    }

    return json.slice(0, maxLinks);
  };

  const fetchPinboardLinks = async () => {
    const res = await request(feedUrl, delay, userAgent);

    if (!res.ok) {
      throw new Error(res.statusText || `HTTP ${res.status}`);
    }

    const json = await res.json();

    return normalizeLinks(json);
  };

  const loadLinklogData = async () => {
    try {
      const links = await fetchPinboardLinks();
      const fetchedAt = now();

      try {
        await writeSnapshot({ fetchedAt, links });
      } catch (err) {
        console.warn(`Failed to write Linklog snapshot: ${err.message}`);
      }

      return {
        fetchedAt,
        links,
        source: "live",
      };
    } catch (liveError) {
      const snapshot = await readSnapshot();

      if (snapshot) {
        console.warn(
          `Serving Linklog snapshot after live fetch failure: ${liveError.message}`,
        );

        return {
          fetchedAt: snapshot.fetchedAt,
          links: snapshot.links,
          source: "snapshot",
        };
      }

      throw liveError;
    }
  };

  return { fetchPinboardLinks, loadLinklogData, normalizeLinks };
};

const { fetchPinboardLinks, loadLinklogData, normalizeLinks } =
  createLinklogDataLoader();

export {
  createLinklogDataLoader,
  fetchPinboardLinks,
  loadLinklogData,
  normalizeLinks,
};
