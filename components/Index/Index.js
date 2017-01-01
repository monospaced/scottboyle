import React, {Component} from 'react';
import ReactDOMServer from'react-dom/server';
import DocumentMeta from 'react-document-meta';
import marked from 'marked';
import Avatar from '../Avatar/Avatar';

class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {data} = this.props;
    const avatar = ReactDOMServer.renderToStaticMarkup(<Avatar/>);
    return (
      <main className="Main">
        <DocumentMeta
          title={`${data.title} ${data.subtitle}`}
        />
        <section
          dangerouslySetInnerHTML={{__html: avatar + marked(data.about)}}
        />
      </main>
    );
  }
}

module.exports = Index;