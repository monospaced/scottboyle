import React from "react";

import "../../assets/.htaccess";
import "./Root.css";
import Head from "../Head/Head";
import { version } from "../../../package.json";

const Root = ({ meta, router }) => {
  return (
    <html lang="en-gb">
      <Head meta={meta} />
      <body className="no-js">
        <script
          dangerouslySetInnerHTML={{ __html: `document.body.className = ""` }}
        />
        <div id="router" dangerouslySetInnerHTML={router} />
        <script src={`/bundle.js?v=${version}`} />
      </body>
    </html>
  );
};

export default Root;
