import React from "react";

import "../../assets/android-chrome-192x192.png";
import "../../assets/android-chrome-512x512.png";
import "../../assets/apple-touch-icon.png";
import "../../assets/browserconfig.xml";
import "../../assets/favicon.ico";
import "../../assets/favicon-16x16.png";
import "../../assets/favicon-32x32.png";
import "../../assets/manifest.webmanifest";
import "../../assets/mstile-150x150.png";
import "../../assets/safari-pinned-tab.svg";
import vars from "!css-variables-loader!../../theme/vars.css";
import { version } from "../../../package.json";

const themeColor = vars["--theme-color"];

const Head = ({ meta }) => {
  return (
    <head>
      <meta charSet="utf-8" />
      {meta}
      <meta name="msapplication-TileColor" content={themeColor} />
      <meta name="theme-color" content={themeColor} />
      <meta name="viewport" content="width=device-width" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color={themeColor} />
      <link rel="stylesheet" href={`/styles.css?v=${version}`} />
    </head>
  );
};

export default Head;
