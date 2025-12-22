const fs = require("fs");
const path = require("path");

const { safeHref } = require("../../src/scripts/href");

const MAX_LINKS = 20;
const S_MAX_AGE = 300;

const FEED_URL =
  process.env.PINBOARD_FEED_URL ||
  `https://feeds.pinboard.in/json/v1/u:monospaced/?count=${MAX_LINKS}`;

const fallbackLinks = [];

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

const templatePath = path.join(__dirname, "templates", "linklog.html");

const injectLinks = (html, links) => {
  const replacement = `<div data-linklog-list>${renderLinks(links)}</div>`;

  return html.replace(
    /<div[^>]*data-linklog-list(?:="[^"]*")?[^>]*>[\s\S]*?<\/div>/,
    replacement,
  );
};

exports.handler = async () => {
  let template;

  try {
    template = fs.readFileSync(templatePath, "utf8");
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
      body: "Missing Linklog template. Run the build to generate it.",
    };
  }

  try {
    const res = await fetch(FEED_URL);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const json = await res.json();
    const links = Array.isArray(json)
      ? json.slice(0, MAX_LINKS)
      : fallbackLinks;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": `public, max-age=0, s-maxage=${S_MAX_AGE}`,
      },
      body: injectLinks(template, links),
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": `public, max-age=0, s-maxage=${S_MAX_AGE}`,
      },
      body: template,
    };
  }
};
