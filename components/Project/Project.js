import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';
import marked from 'marked';
import Client from '../Client/Client';
import Visit from '../Visit/Visit';
import Screenshot from '../Screenshot/Screenshot';

class Project extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {data, route: {path}} = this.props;
    const slug = path.slice(0, -1);
    const project = data.projects[slug];
    return (
      <main className="Main">
        <DocumentMeta
          title={`${project.title} | ${data.title} ${data.subtitle}`}
        />
        <section>
          <h2>{project.title} <small>({project.date})</small></h2>
          <div dangerouslySetInnerHTML={{__html: marked(project.description)}}/>
          {project.client && <Client client={project.client}/>}
          {project.link && <Visit project={project}/>}
          <Screenshot slug={slug} project={project}/>
        </section>
      </main>
    );
  }
}

module.exports = Project;