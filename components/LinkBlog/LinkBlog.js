import React, {Component} from 'react';
import ReactDOMServer from'react-dom/server';
import DocumentMeta from 'react-document-meta';
import './LinkBlog.css';

class LinkBlog extends Component {
  constructor(props) {
    super(props);
    this.state = { spa: false };
  }
  componentDidMount() {
    this.setState({ spa: true });
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
          {!this.state.spa ?
          <div className="LinkBlog" dangerouslySetInnerHTML={{__html: `
<?php
  $ch = curl_init();
  $timeout = 2;
  curl_setopt($ch, CURLOPT_URL,
  "https://feed.informer.com/widgets/2JILLJFOJU.html");
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_exec($ch);
  curl_close($ch);
?>
          `.trim()}}/> :
          <div className="LinkBlog">
            {/*
              <script src="https://feed.informer.com/widgets/JDTPAOKUAA.js"/>
              https://feed.informer.com/digests/4TVQEYQXTS/feeder.rss
            */}
          </div>
        }
        </section>
      </main>
    );
  }
}

module.exports = LinkBlog;
