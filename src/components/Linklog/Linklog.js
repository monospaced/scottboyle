import "core-js/es6/promise";
import DocumentMeta from "react-document-meta";
import fetchJsonp from "fetch-jsonp";
import React, { Component } from "react";
import TimeAgo from "timeago-react";

import "../Main/Main.css";

const feed =
  "https://feeds.pinboard.in/json/v1/u:monospaced/?count=33&cb=pinboard";

class Linklog extends Component {
  constructor(props) {
    super(props);
    this.state = { links: false };
  }

  render() {
    const { data: { description, subtitle, title } } = this.props;
    const { links } = this.state;

    return (
      <main className="Main">
        <DocumentMeta
          title={`${title} | ${subtitle} | Linklog`}
          description={description}
        />
        <section>
          <h2>Linklog</h2>
          {links ? (
            <ul>
              {links.map(item => {
                return (
                  <li key={item.dt}>
                    <a href={item.u}>{item.d}</a> <TimeAgo datetime={item.dt} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul
              dangerouslySetInnerHTML={{
                __html: `
                  <?php
                    function jsonp_decode($jsonp, $assoc = false) {
                      if($jsonp[0] !== '[' && $jsonp[0] !== '{') {
                        $jsonp = substr($jsonp, strpos($jsonp, '('));
                      }
                      return json_decode(trim($jsonp,'();'), $assoc);
                    }
                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL,
                    "${feed}");
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
                  ?></a> <time datetime="<?php
                    echo $item[dt]
                  ?>"></time></li><?php
                    }
                  ?>
                `.trim(),
              }}
            />
          )}
        </section>
      </main>
    );
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchLinks(feed);
  }

  fetchLinks(url) {
    return fetchJsonp(url, { jsonpCallback: "cb" })
      .then(res => res.json())
      .then(json => this.setState({ links: json }))
      .catch(err => this.setState({ links: false }));
  }
}

export default Linklog;
