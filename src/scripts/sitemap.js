const fs = require("fs");
const path = require("path");
const ReactRouterToArray = require("react-router-to-array");

const { url: siteUrl } = require("./data");

const OUTPUT_PATH = path.join(__dirname, "..", "..", "build", "sitemap.xml");

const normalizePath = routePath => {
  if (!routePath) {
    return "/";
  }

  let nextPath = routePath;

  if (nextPath[0] !== "/") {
    nextPath = `/${nextPath}`;
  }

  if (nextPath[nextPath.length - 1] !== "/") {
    nextPath = `${nextPath}/`;
  }

  return nextPath;
};

const isPublicRoute = routePath =>
  routePath &&
  typeof routePath === "string" &&
  !routePath.includes("*") &&
  !routePath.includes("404");

const unique = items => Array.from(new Set(items));

const buildSitemap = (routes = []) => {
  const normalizedSiteUrl = (process.env.SITE_URL || siteUrl).replace(
    /\/+$/,
    "",
  );
  const routesArray = Array.isArray(routes)
    ? routes
    : ReactRouterToArray(routes);
  const urls = unique(routesArray.filter(isPublicRoute).map(normalizePath)).map(
    routePath => `${normalizedSiteUrl}${routePath}`,
  );

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(url => `  <url><loc>${url}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, xml, "utf8");

  return { outputPath: OUTPUT_PATH, urls, xml };
};

/* istanbul ignore next */
if (require.main === module) {
  require("babel-core/register")({
    presets: ["env", "react"],
  });

  const ignoreExtensions = [
    "._redirects",
    ".css",
    ".ico",
    ".jpg",
    ".png",
    ".svg",
    ".webmanifest",
    ".woff",
    ".xml",
  ];

  ignoreExtensions.forEach(ext => {
    require.extensions[ext] = () => {};
  });

  const routes = require("./routes");
  const { outputPath } = buildSitemap(routes);
  console.log(`Wrote sitemap to ${outputPath}`);
}

module.exports = {
  buildSitemap,
  isPublicRoute,
  normalizePath,
  unique,
};
