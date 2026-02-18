import React from "react";

import "../Main/Main.css";
import PageMeta from "../PageMeta/PageMeta";
const NotFound = ({ data: { subtitle, title } }) => {
  const siteName = `${title} | ${subtitle}`;
  const pageTitle = `Page not found | ${siteName}`;

  return (
    <main aria-labelledby="page-title" className="Main" id="main" tabIndex="-1">
      <PageMeta noIndex title={pageTitle} />
      <section>
        <h2 id="page-title">
          404 <small>Page not found</small>
        </h2>
        <p>The requested URL was not found on this server.</p>
      </section>
    </main>
  );
};

export default NotFound;
