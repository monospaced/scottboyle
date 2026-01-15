const FETCH_TIMEOUT_MS = 4000;
const MAX_AGE_S = 3600;
const MAX_LINKS = 20;
const USER_AGENT = "MonospacedLinklog/1.0 (+https://scottboyle.uk/linklog/)";

const FEED_URL =
  process.env.PINBOARD_FEED_URL ||
  `https://feeds.pinboard.in/json/v1/u:monospaced/?count=${MAX_LINKS}`;

module.exports = {
  FETCH_TIMEOUT_MS,
  FEED_URL,
  MAX_AGE_S,
  MAX_LINKS,
  USER_AGENT,
};
