const fs = require("fs");
const path = require("path");

const { linklogErrorMessage } = require("../../src/scripts/data");
const { fetchWithTimeout } = require("../../src/scripts/fetch");
const { safeHref } = require("../../src/scripts/href");

const {
  FETCH_TIMEOUT_MS,
  MAX_AGE_S,
  MAX_LINKS,
  USER_AGENT,
} = require("./linklog-config");

const escapeHtml = value =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatDate = value => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return escapeHtml(value);
  }

  return date.toISOString().slice(0, 10);
};

const renderLinks = links => {
  const items = links
    .map(item => {
      const href = safeHref(item.u);

      if (!href) {
        return "";
      }

      const description = escapeHtml(item.n || "");
      const timeText = formatDate(item.dt || "");
      const timeValue = escapeHtml(item.dt || "");
      const title = escapeHtml(item.d || "");

      return `
        <li class="Linklog-item">
          <a href="${escapeHtml(href)}">${title}</a>
          <time datetime="${timeValue}">${timeText}</time>
          <span class="Linklog-description">${description}</span>
        </li>
      `;
    })
    .join("");

  return `<ul>${items}</ul>`;
};

const resolveBaseUrl = event => {
  if (event && event.headers) {
    const host = event.headers.host;

    if (host) {
      const forwardedProto = event.headers["x-forwarded-proto"];

      const protocol =
        forwardedProto ||
        (host.startsWith("localhost") || host.startsWith("127.0.0.1")
          ? "http"
          : "https");

      return `${protocol}://${host}`;
    }
  }

  return (
    process.env.URL || process.env.DEPLOY_URL || process.env.SITE_URL || ""
  );
};

const templatePath = path.join(__dirname, "templates", "linklog.html");

const injectData = (html, payload) => {
  const json = JSON.stringify(payload)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
  const script = `<script id="linklog-data" type="application/json">${json}</script>`;

  return html.replace(/<\/body>/, `${script}</body>`);
};

const injectLinks = (html, links) => {
  const replacement = `<div data-linklog-list>${renderLinks(links)}</div>`;

  return html.replace(
    /<div[^>]*data-linklog-list(?:="[^"]*")?[^>]*>[\s\S]*?<\/div>/,
    replacement,
  );
};

const injectError = html =>
  html.replace(
    /<div[^>]*data-linklog-list(?:="[^"]*")?[^>]*>[\s\S]*?<\/div>/,
    `<div data-linklog-list>${linklogErrorMessage}</div>`,
  );

exports.handler = async event => {
  let template;

  try {
    template = fs.readFileSync(templatePath, "utf8");
  } catch (err) {
    return {
      body: "Missing Linklog template. Run the build to generate it.",
      headers: { "Content-Type": "text/plain; charset=utf-8" },
      statusCode: 500,
    };
  }

  try {
    const baseUrl = resolveBaseUrl(event);
    const apiUrl = baseUrl ? `${baseUrl}/api/linklog` : "";

    if (!apiUrl) {
      throw new Error("Missing base URL for /api/linklog");
    }

    const res = await fetchWithTimeout(apiUrl, FETCH_TIMEOUT_MS, USER_AGENT);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
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
      body: injectData(injectLinks(template, links), links),
      headers: {
        "Cache-Control": `public, max-age=0, s-maxage=${MAX_AGE_S}`,
        "Content-Type": "text/html; charset=utf-8",
      },
      statusCode: 200,
    };
  } catch (err) {
    return {
      body: injectData(injectError(template), { error: true }),
      headers: {
        "Cache-Control": `public, max-age=0, s-maxage=${MAX_AGE_S}`,
        "Content-Type": "text/html; charset=utf-8",
      },
      statusCode: 200,
    };
  }
};
