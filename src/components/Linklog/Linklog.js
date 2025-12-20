import "core-js/es6/promise";
import DocumentMeta from "react-document-meta";
import React, { Component } from "react";
import TimeAgo from "timeago-react";

import "../Main/Main.css";
import { safeHref } from "../../scripts/href";

const api = "/api/linklog";

class Linklog extends Component {
  constructor(props) {
    super(props);
    this.state = { links: [] };
  }

  render() {
    const {
      data: { description, subtitle, title },
    } = this.props;
    const { links } = this.state;
    /* istanbul ignore next */
    const base =
      typeof window !== "undefined" && window.location
        ? window.location.origin
        : "http://localhost";

    return (
      <main className="Main">
        <DocumentMeta
          title={`${title} | ${subtitle} | Linklog`}
          description={description}
        />
        <section>
          <h2>Linklog</h2>
          <div data-linklog-list>
            {links ? (
              <ul>
                {links.map(item => {
                  const href = safeHref(item.u, base);
                  if (!href) {
                    return null;
                  }
                  return (
                    <li key={item.dt}>
                      <a href={href}>{item.d}</a>{" "}
                      <TimeAgo datetime={item.dt} />
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </section>
      </main>
    );
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    if (typeof fetch !== "function") {
      return;
    }

    fetch(api)
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then(json => {
        if (Array.isArray(json)) {
          this.setState({ links: json });
        }
      })
      .catch(() => {
        // Keep bundled links on failure
      });
  }
}

export default Linklog;
