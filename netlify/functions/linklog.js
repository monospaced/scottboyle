const { fetchWithTimeout } = require("../../src/scripts/fetch");

const {
  FETCH_TIMEOUT_MS,
  FEED_URL,
  MAX_AGE_S,
  MAX_LINKS,
  USER_AGENT,
} = require("./linklog-config");

const parseAllowedOrigins = value =>
  value
    ? value
        .split(",")
        .map(origin => origin.trim())
        .filter(Boolean)
    : [];

const allowedOrigins = parseAllowedOrigins(process.env.ALLOWED_ORIGIN);

const corsHeadersFor = origin => {
  if (origin && allowedOrigins.includes(origin)) {
    return { "Access-Control-Allow-Origin": origin };
  }
  return {};
};

exports.handler = async event => {
  const origin =
    (event &&
      event.headers &&
      (event.headers.origin || event.headers.Origin)) ||
    "";
  const corsHeaders = corsHeadersFor(origin);

  try {
    const res = await fetchWithTimeout(FEED_URL, FETCH_TIMEOUT_MS, USER_AGENT);

    if (!res.ok) {
      return {
        body: JSON.stringify({
          error: "Failed to fetch feed",
          message: res.statusText,
        }),
        headers: {
          ...corsHeaders,
          "Cache-Control": "no-store",
          "Content-Type": "application/json",
        },
        statusCode: res.status,
      };
    }

    const json = await res.json();

    if (!Array.isArray(json)) {
      throw new Error("Expected JSON array");
    }

    if (json.length === 0) {
      throw new Error("Expected non-empty JSON array");
    }

    const links = json.slice(0, MAX_LINKS);

    return {
      body: JSON.stringify(links),
      headers: {
        ...corsHeaders,
        "Cache-Control": `public, max-age=0, s-maxage=${MAX_AGE_S}`,
        "Content-Type": "application/json",
      },
      statusCode: 200,
    };
  } catch (err) {
    return {
      body: JSON.stringify({
        error: "Failed to fetch feed",
        message: err.message,
      }),
      headers: {
        ...corsHeaders,
        "Cache-Control": "no-store",
        "Content-Type": "application/json",
      },
      statusCode: 500,
    };
  }
};
