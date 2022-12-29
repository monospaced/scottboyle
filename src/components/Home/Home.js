import DocumentMeta from "react-document-meta";
import marked from "marked";
import React from "react";

import "../Main/Main.css";
import Avatar from "../Avatar/Avatar";

const Home = ({ data: { about, description, subtitle, title } }) => {
  return (
    <main className="Main vcard">
      <DocumentMeta
        title={`${title} | ${subtitle}`}
        description={description}
      />
      <section>
        <Avatar />
        <div dangerouslySetInnerHTML={{ __html: marked.parse(about.trim()) }} />
      </section>
    </main>
  );
};

export default Home;
