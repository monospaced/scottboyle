import { parse } from "marked";
import React from "react";

import "../Main/Main.css";
import Avatar from "../Avatar/Avatar";
import PageMeta from "../PageMeta/PageMeta";
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
      <PageMeta
        canonical={canonical}
        description={description}
        meta={meta}
        title={siteName}
      />
      <section>
        <Avatar />
        <div dangerouslySetInnerHTML={{ __html: parse(about.trim()) }} />
      </section>
    </main>
  );
};

export default Home;
