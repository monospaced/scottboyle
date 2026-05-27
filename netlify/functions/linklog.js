const {
  MAX_AGE_S,
  SNAPSHOT_MAX_AGE_S,
} = require("./linklog-config");
const { loadLinklogData } = require("./linklog-data");

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
    const { links, source } = await loadLinklogData(event);
    const maxAge = source === "snapshot" ? SNAPSHOT_MAX_AGE_S : MAX_AGE_S;

    return {
      body: JSON.stringify(links),
      headers: {
        ...corsHeaders,
        "Cache-Control": `public, max-age=0, s-maxage=${maxAge}`,
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
