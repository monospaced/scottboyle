import { MAX_AGE_S, SNAPSHOT_MAX_AGE_S } from "../lib/linklog-config.mjs";
import { loadLinklogData } from "../lib/linklog-data.mjs";

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

export default async request => {
  const origin = request.headers.get("origin") || "";
  const corsHeaders = corsHeadersFor(origin);

  try {
    const { links, source } = await loadLinklogData();
    const maxAge = source === "snapshot" ? SNAPSHOT_MAX_AGE_S : MAX_AGE_S;

    return new Response(JSON.stringify(links), {
      headers: {
        ...corsHeaders,
        "Cache-Control": `public, max-age=0, s-maxage=${maxAge}`,
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch feed",
        message: err.message,
      }),
      {
        headers: {
          ...corsHeaders,
          "Cache-Control": "no-store",
          "Content-Type": "application/json",
        },
        status: 500,
      },
    );
  }
};
