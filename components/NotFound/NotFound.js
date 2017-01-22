import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';

class NotFound extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {data} = this.props;
    return (
      <main className="Main">
        <DocumentMeta
          title={`Page not found | ${data.title} | ${data.subtitle}`}
          meta={{ name: { robots: 'noindex' } }}
        />
        <section>
          <h2>404 <small>Page not found</small></h2>
          <p>The requested URL was not found on this server.</p>
        </section>
      </main>
    );
  }
}

module.exports = NotFound;
