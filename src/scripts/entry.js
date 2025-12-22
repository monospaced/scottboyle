import { browserHistory, createMemoryHistory, Router } from "react-router";
import DocumentMeta from "react-document-meta";
import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";

import Root from "../components/Root/Root.js";
import routes from "./routes";

if (typeof document !== "undefined") {
  const router = document.getElementById("router");

  ReactDOM.hydrate(
    <Router
      onUpdate={() => {
        const main = document.getElementById("main");
        if (main) {
          main.focus();
        }

        if (document.documentElement.clientWidth < 700) {
          window.scrollTo(0, 0);
        }
      }}
      history={browserHistory}
      routes={routes}
    />,
    router,
  );
}

export default ({ path }, callback) => {
  const history = createMemoryHistory(path);
  const router = {
    __html: ReactDOMServer.renderToString(
      <Router history={history} routes={routes} />,
    ),
  };
  const meta = DocumentMeta.renderAsReact();
  const html = ReactDOMServer.renderToStaticMarkup(
    <Root meta={meta} router={router} />,
  );

  callback(null, "<!DOCTYPE html>" + html);
};
