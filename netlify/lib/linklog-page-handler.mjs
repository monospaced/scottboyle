import dataModule from "../../src/scripts/data.js";
import hrefModule from "../../src/scripts/href.js";

import { MAX_AGE_S, SNAPSHOT_MAX_AGE_S } from "./linklog-config.mjs";
import { loadLinklogData as defaultLoadLinklogData } from "./linklog-data.mjs";

const { linklogErrorMessage } = dataModule;
const { safeHref } = hrefModule;

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

const createLinklogPageHandler = ({
  loadLinklogData = defaultLoadLinklogData,
  readTemplate,
} = {}) => async () => {
  let template;

  try {
    template = readTemplate();
  } catch (err) {
    return new Response("Missing Linklog template. Run the build to generate it.", {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
      status: 500,
    });
  }

  try {
    const { links, source } = await loadLinklogData();
    const maxAge = source === "snapshot" ? SNAPSHOT_MAX_AGE_S : MAX_AGE_S;

    return new Response(injectData(injectLinks(template, links), links), {
      headers: {
        "Cache-Control": `public, max-age=0, s-maxage=${maxAge}`,
        "Content-Type": "text/html; charset=utf-8",
      },
      status: 200,
    });
  } catch (err) {
    console.error(`Failed to render Linklog page: ${err.message}`);

    return new Response(injectData(injectError(template), { error: true }), {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/html; charset=utf-8",
      },
      status: 503,
    });
  }
};

export { createLinklogPageHandler };
