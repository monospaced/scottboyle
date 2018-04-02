import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import { Router, browserHistory, createMemoryHistory } from "react-router";
import DocumentMeta from "react-document-meta";
import Root from "../components/Root/Root.js";
import routes from "./routes";

if (typeof document !== "undefined") {
  // Single page app
  const app = document.getElementById("app");
  ReactDOM.hydrate(
    <Router
      onUpdate={() => {
        if (document.documentElement.clientWidth < 700) {
          window.scrollTo(0, 0);
        }
      }}
      history={browserHistory}
      routes={routes}
    />,
    app,
  );
}

export default (locals, callback) => {
  // Render static site, consts must be declared in this order
  const history = createMemoryHistory(locals.path);
  const app = {
    __html: ReactDOMServer.renderToString(
      <Router history={history} routes={routes} />,
    ),
  };
  const meta = DocumentMeta.renderAsReact();
  const html = ReactDOMServer.renderToStaticMarkup(
    <Root app={app} meta={meta} />,
  );
  callback(null, "<!DOCTYPE html>" + html);
};
