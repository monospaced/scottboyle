import React from "react";

import "./Root.css";
import Head from "../Head/Head";
import { version } from "../../../package.json";

const Root = ({ helmet, router }) => {
  return (
    <html lang="en-GB">
      <Head helmet={helmet} />
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
