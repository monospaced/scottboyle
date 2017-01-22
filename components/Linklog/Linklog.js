import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';
import TimeAgo from 'timeago-react';
import fetchJsonp from 'fetch-jsonp';

const feed = 'https://feeds.pinboard.in/json/v1/u:monospaced/?count=31&cb=pinboard';

class Linklog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: false,
    };
  }
  componentDidMount() {
    fetchJsonp(feed, {
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
          title={`${data.title} | ${data.subtitle} | Linklog`}
          description={data.description}
        />
        <section>
          <h2>Linklog</h2>
          {this.state.links ? (
            <ul>{this.state.links.map((item) => {
              return (
                <li key={item.dt}>
                  <a href={item.u}>{item.d}</a> <TimeAgo datetime={item.dt}/>
                </li>
              );
            })}</ul>
          ) : (
            <ul dangerouslySetInnerHTML={{__html: `
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
            `.trim()}}/>
          )}
        </section>
      </main>
    );
  }
}

module.exports = Linklog;
