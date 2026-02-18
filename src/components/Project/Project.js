import { parse } from "marked";
import React from "react";

import "../Main/Main.css";
import Client from "../Client/Client";
import PageMeta from "../PageMeta/PageMeta";
import Screenshot from "../Screenshot/Screenshot";
import Visit from "../Visit/Visit";
import { buildSocialMeta } from "../../scripts/meta";

const Project = ({
  data: { description, projects, subtitle, title, url },
  path,
}) => {
  const project = projects[path];
  const { client, content, date, link, title: projectTitle } = project;

  const siteName = `${title} | ${subtitle}`;
  const pageTitle = `${siteName} | ${projectTitle}`;
  const pageUrl = `${url}/${path}/`;
  const socialImage = `${url}/social.png`;
  const { canonical, meta } = buildSocialMeta({
    description,
    image: socialImage,
    siteName,
    title: pageTitle,
    type: "article",
    url: pageUrl,
  });

  return (
    <main aria-labelledby="page-title" className="Main" id="main" tabIndex="-1">
      <PageMeta
        canonical={canonical}
        description={description}
        meta={meta}
        title={pageTitle}
      />
      <section>
        <h2 id="page-title">
          <span translate="no">{projectTitle}</span> <small>({date})</small>
        </h2>
        <div
          dangerouslySetInnerHTML={{ __html: parse(content.trim()) }}
        />
        {client && <Client client={client} />}
        {link && <Visit project={project} />}
        <Screenshot project={project} slug={path} />
      </section>
    </main>
  );
};

export default Project;
