import React from "react";

import "../../assets/apple-touch-icon.png";
import "../../assets/favicon.ico";
import "../../assets/icon.svg";
import "../../assets/icon-192x192.png";
import "../../assets/icon-512x512.png";
import "../../assets/humans.txt";
import "../../assets/manifest.webmanifest";
import "../../assets/robots.txt";
import "../../assets/social.png";
import "../../assets/.well-known/security.txt";
import { version } from "../../../package.json";
import { subtitle, title, url } from "../../scripts/data";
import vars from "!css-variables-loader!../../theme/vars.css";

const siteName = `${title} | ${subtitle}`;
const siteUrl = url;
const themeColor = vars["--theme-color"];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: siteName,
      alternateName: title,
      url: siteUrl,
    },
    {
      "@type": "Person",
      name: title,
      sameAs: [
        "https://github.com/monospaced",
        "https://www.linkedin.com/in/scottboyle/",
      ],
      url: siteUrl,
    },
  ],
};

const Head = ({ meta }) => {
  return (
    <head>
      <meta charSet="utf-8" />
      {meta}
      <meta name="theme-color" content={themeColor} />
      <meta name="viewport" content="width=device-width" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="Pinboard (monospaced)"
        href="https://feeds.pinboard.in/rss/secret:408c7b80a1d865c97e0a/u:monospaced/"
      />
      <link rel="icon" href="/favicon.ico" sizes="32x32" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link
        rel="apple-touch-icon"
        href="/apple-touch-icon.png"
        sizes="180x180"
      />
      <link rel="manifest" href="/manifest.webmanifest" />
      <link rel="stylesheet" href={`/styles.css?v=${version}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </head>
  );
};

export default Head;
