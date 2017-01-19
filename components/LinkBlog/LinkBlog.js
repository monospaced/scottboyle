import React, {Component} from 'react';
import ReactDOMServer from'react-dom/server';
import DocumentMeta from 'react-document-meta';
import marked from 'marked';
import './LinkBlog.css';

class LinkBlog extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {data} = this.props;
    return (
      <main className="Main">
        <DocumentMeta
          title={`Link blog | ${data.title} ${data.subtitle}`}
          description={data.description}
        />
        <section>
          <h2>Link blog</h2>
          <div className="LinkBlog" dangerouslySetInnerHTML={{__html: `
<?php
  $ch = curl_init();
  $timeout = 2;
  curl_setopt($ch, CURLOPT_URL,
  "http://app.feed.informer.com/digest3/JDTPAOKUAA.html");
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_exec($ch);
  curl_close($ch);
?>
            `.trim()}}
          />
        </section>
      </main>
    );
  }
}

module.exports = LinkBlog;
