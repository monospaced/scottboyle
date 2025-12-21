import "core-js/es6/promise";
import React, { Component } from "react";
import DocumentMeta from "react-document-meta";
import TimeAgo from "timeago-react";

import "../Main/Main.css";
import { safeHref } from "../../scripts/href";

import "./Linklog.css";

const api = "/api/linklog";

class Linklog extends Component {
  constructor(props) {
    super(props);
    this.state = { links: [], status: "loading" };
  }

  render() {
    const {
      data: { description, subtitle, title },
    } = this.props;
    const { links, status } = this.state;
    const hasLinks = Array.isArray(links) && links.length > 0;
    const showError = !hasLinks && status === "error";
    const showLoading = !hasLinks && status === "loading";
    let content = null;

    if (hasLinks) {
      content = (
        <ul>
          {links.map(item => {
            const href = safeHref(item.u);

            if (!href) {
              return null;
            }

            return (
              <li className="Linklog-item" key={item.dt}>
                <a href={href}>{item.d}</a> <TimeAgo datetime={item.dt} />
                <span className="Linklog-description">{item.n}</span>
              </li>
            );
          })}
        </ul>
      );
    } else if (showError) {
      content = "Unable to load linklog.";
    } else if (showLoading) {
      content = "Loading…";
    }

    return (
      <main className="Main">
        <DocumentMeta
          title={`${title} | ${subtitle} | Linklog`}
          description={description}
        />
        <section>
          <h2 translate="no">Linklog</h2>
          <div data-linklog-list>{content}</div>
          <p>
            Subscribe to{" "}
            <a
              href="https://feeds.pinboard.in/rss/secret:408c7b80a1d865c97e0a/u:monospaced"
              translate="no"
            >
              RSS feed
            </a>
            .
          </p>
        </section>
      </main>
    );
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    if (typeof fetch !== "function") {
      this.setState({ status: "error" });

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
          this.setState({ links: json, status: "loaded" });

          return;
        }
        this.setState({ status: "error" });
      })
      .catch(() => {
        this.setState({ status: "error" });
      });
  }
}

export default Linklog;
