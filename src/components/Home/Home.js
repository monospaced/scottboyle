import DocumentMeta from "react-document-meta";
import marked from "marked";
import React from "react";

import "../Main/Main.css";
import Avatar from "../Avatar/Avatar";
import { buildSocialMeta } from "../../scripts/meta";

const Home = ({ data: { about, description, subtitle, title, url } }) => {
  const pageUrl = `${url}/`;
  const siteName = `${title} | ${subtitle}`;
  const socialImage = `${url}/social.png`;
  const { canonical, meta } = buildSocialMeta({
    description,
    image: socialImage,
    siteName,
    title: siteName,
    url: pageUrl,
  });

  return (
    <main
      aria-labelledby="page-title"
      className="Main vcard"
      id="main"
      tabIndex="-1"
    >
      <DocumentMeta
        canonical={canonical}
        description={description}
        meta={meta}
        title={siteName}
      />
      <section>
        <Avatar />
        <div dangerouslySetInnerHTML={{ __html: marked.parse(about.trim()) }} />
      </section>
    </main>
  );
};

export default Home;
