import DocumentMeta from "react-document-meta";
import React from "react";

import "../Main/Main.css";

const NotFound = ({ data: { subtitle, title } }) => {
  return (
    <main className="Main">
      <DocumentMeta
        title={`Page not found | ${title} | ${subtitle}`}
        meta={{ name: { robots: "noindex" } }}
      />
      <section>
        <h2>
          404 <small>Page not found</small>
        </h2>
        <p>The requested URL was not found on this server.</p>
      </section>
    </main>
  );
};

export default NotFound;
