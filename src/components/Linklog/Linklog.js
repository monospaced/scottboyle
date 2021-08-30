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
          ) : null}
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
