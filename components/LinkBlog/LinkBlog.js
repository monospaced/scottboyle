import React, {Component} from 'react';
import ReactDOMServer from'react-dom/server';
import DocumentMeta from 'react-document-meta';
import fetchJsonp from 'fetch-jsonp';
import './LinkBlog.css';

class LinkBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: false,
    };
  }
  componentDidMount() {
    fetchJsonp('https://feeds.pinboard.in/json/v1/u:monospaced/?count=40&cb=pinboard', {
      jsonpCallback: 'cb',
    })
    .then(res => {
      return res.json();
    })
    .then(json => {
      return this.setState({
        links: json,
      });
    })
    .catch(err => {
      console.error(err);
      return this.setState({
        links: false,
      });
    });
  }
  render() {
    const {data} = this.props;
    return (
      <main className="Main">
        <DocumentMeta
          title={`Link Blog | ${data.title} ${data.subtitle}`}
          description={data.description}
        />
        <section>
          <h2>Link Blog</h2>
          {!this.state.links ?
          <div className="LinkBlog" dangerouslySetInnerHTML={{__html: `
<ul><?php
  function jsonp_decode($jsonp, $assoc = false) {
    if($jsonp[0] !== '[' && $jsonp[0] !== '{') {
      $jsonp = substr($jsonp, strpos($jsonp, '('));
    }
    return json_decode(trim($jsonp,'();'), $assoc);
  }
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL,
  "https://feeds.pinboard.in/json/v1/u:monospaced/?count=40&cb=pinboard");
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  $res = curl_exec($ch);
  curl_close($ch);
  $links = jsonp_decode($res, true);
  foreach($links as $item) {
?><li><a href="<?php
  echo $item[u]
?>"><?php
  echo $item[d]
?></a> <small><?php
  echo $item[dt]
?></small></a></li><?php
  }
?></ul>
          `.trim()}}/> :
          <div className="LinkBlog">
            <ul>{this.state.links.map((item) => {
              return (
                <li key={item.dt}>
                  <a href={item.u}>{item.d}</a> <small>{item.dt}</small>
                </li>
              );
            })}</ul>
          </div>
        }
        </section>
      </main>
    );
  }
}

module.exports = LinkBlog;
