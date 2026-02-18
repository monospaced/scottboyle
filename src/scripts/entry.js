import { browserHistory, createMemoryHistory, Router } from "react-router";
import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";

import Root from "../components/Root/Root.js";
import routes from "./routes";

if (typeof document !== "undefined") {
  const router = document.getElementById("router");

  ReactDOM.hydrate(
    <HelmetProvider>
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
      />
    </HelmetProvider>,
    router,
  );
}

export default ({ path }, callback) => {
  const history = createMemoryHistory(path);
  const helmetContext = {};
  const router = {
    __html: ReactDOMServer.renderToString(
      <HelmetProvider context={helmetContext}>
        <Router history={history} routes={routes} />
      </HelmetProvider>,
    ),
  };
  const html = ReactDOMServer.renderToStaticMarkup(
    <Root helmet={helmetContext.helmet} router={router} />,
  );

  callback(null, "<!DOCTYPE html>" + html);
};
