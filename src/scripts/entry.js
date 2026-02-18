import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import { BrowserRouter, useLocation } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server.js";
import { HelmetProvider } from "react-helmet-async";

import Root from "../components/Root/Root.js";
import AppRoutes, { ensureTrailingSlashPath } from "./routes";

const RouteEffects = () => {
  const location = useLocation();

  useEffect(() => {
    const main = document.getElementById("main");
    if (main) {
      main.focus();
    }

    if (document.documentElement.clientWidth < 700) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
};

if (typeof document !== "undefined") {
  const normalizedPath = ensureTrailingSlashPath(window.location.pathname);
  const router = document.getElementById("router");

  if (normalizedPath !== window.location.pathname) {
    const { hash, search } = window.location;
    window.history.replaceState(null, "", `${normalizedPath}${search}${hash}`);
  }

  ReactDOM.hydrate(
    <HelmetProvider>
      <BrowserRouter>
        <RouteEffects />
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>,
    router,
  );
}

export default ({ path }, callback) => {
  const helmetContext = {};
  const normalizedPath = ensureTrailingSlashPath(path);
  const router = {
    __html: ReactDOMServer.renderToString(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={normalizedPath}>
          <AppRoutes />
        </StaticRouter>
      </HelmetProvider>,
    ),
  };
  const html = ReactDOMServer.renderToStaticMarkup(
    <Root helmet={helmetContext.helmet} router={router} />,
  );

  callback(null, "<!DOCTYPE html>" + html);
};
