const FEED_URL =
  process.env.PINBOARD_FEED_URL ||
  "https://feeds.pinboard.in/json/v1/u:monospaced/?count=33";

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
    (event && event.headers && (event.headers.origin || event.headers.Origin)) ||
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
    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
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
