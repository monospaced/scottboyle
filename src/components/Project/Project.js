import DocumentMeta from "react-document-meta";
import marked from "marked";
import React from "react";

import "../Main/Main.css";
import Client from "../Client/Client";
import Screenshot from "../Screenshot/Screenshot";
import Visit from "../Visit/Visit";

const Project = ({
  data: { description, projects, subtitle, title },
  route: { path },
}) => {
  const project = projects[path];
  const { client, content, date, link, title: projectTitle } = project;

  return (
    <main className="Main">
      <DocumentMeta
        title={`${title} | ${subtitle} | ${projectTitle}`}
        description={description}
      />
      <section>
        <h2>
          <span translate="no">{projectTitle}</span> <small>({date})</small>
        </h2>
        <div
          dangerouslySetInnerHTML={{ __html: marked.parse(content.trim()) }}
        />
        {client && <Client client={client} />}
        {link && <Visit project={project} />}
        <Screenshot project={project} slug={path} />
      </section>
    </main>
  );
};

export default Project;
