const MAX_AGE = 300;
const MAX_LINKS = 20;

const FEED_URL =
  process.env.PINBOARD_FEED_URL ||
  `https://feeds.pinboard.in/json/v1/u:monospaced/?count=${MAX_LINKS}`;

module.exports = { FEED_URL, MAX_AGE, MAX_LINKS };
