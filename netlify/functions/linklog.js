const { FEED_URL, MAX_AGE, MAX_LINKS } = require("./linklog-config");

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
        body: res.statusText,
        headers: corsHeaders,
        statusCode: res.status,
      };
    }

    const json = await res.json();
    const links = Array.isArray(json) ? json.slice(0, MAX_LINKS) : json;

    return {
      body: JSON.stringify(links),
      headers: {
        ...corsHeaders,
        "Cache-Control": `public, max-age=0, s-maxage=${MAX_AGE}`,
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
      headers: corsHeaders,
      statusCode: 500,
    };
  }
};
