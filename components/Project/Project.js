import React, { Component } from "react";
import DocumentMeta from "react-document-meta";
import marked from "marked";
import Client from "../Client/Client";
import Visit from "../Visit/Visit";
import Screenshot from "../Screenshot/Screenshot";

class Project extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data, route: { path } } = this.props;
    const project = data.projects[path];
    return (
      <main className="Main">
        <DocumentMeta
          title={`${data.title} | ${data.subtitle} | ${project.title}`}
        />
        <section>
          <h2>
            {project.title} <small>({project.date})</small>
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: marked(project.content.trim()) }}
          />
          {project.client && <Client client={project.client} />}
          {project.link && <Visit project={project} />}
          <Screenshot slug={path} project={project} />
        </section>
      </main>
    );
  }
}

module.exports = Project;
