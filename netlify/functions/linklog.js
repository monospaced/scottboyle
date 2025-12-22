const MAX_LINKS = 20;
const S_MAX_AGE = 300;

const FEED_URL =
  process.env.PINBOARD_FEED_URL ||
  `https://feeds.pinboard.in/json/v1/u:monospaced/?count=${MAX_LINKS}`;

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
    const res = await fetch(FEED_URL);

    if (!res.ok) {
      return {
        statusCode: res.status,
        headers: corsHeaders,
        body: res.statusText,
      };
    }

    const json = await res.json();
    const links = Array.isArray(json) ? json.slice(0, MAX_LINKS) : json;

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=0, s-maxage=${S_MAX_AGE}`,
      },
      body: JSON.stringify(links),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: "Failed to fetch feed",
        message: err.message,
      }),
    };
  }
};
