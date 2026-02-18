import "core-js/es/promise";
import React, { Component } from "react";
import TimeAgo from "timeago-react";

import "../Main/Main.css";
import PageMeta from "../PageMeta/PageMeta";
import { safeHref } from "../../scripts/href";
import { buildSocialMeta } from "../../scripts/meta";

import "./Linklog.css";

const api = "/api/linklog";

const getEmbeddedState = () => {
  if (typeof document === "undefined") {
    return null;
  }

  const node = document.getElementById("linklog-data");

  if (!node || !node.textContent) {
    return null;
  }

  try {
    const json = JSON.parse(node.textContent);

    node.remove();

    if (Array.isArray(json)) {
      if (json.length === 0) {
        return { links: [], status: "error" };
      }

      return { links: json, status: "loaded" };
    }

    if (json && json.error) {
      return { links: [], status: "error" };
    }

    return null;
  } catch (err) {
    node.remove();
    return null;
  }
};

class Linklog extends Component {
  constructor(props) {
    super(props);

    const embeddedState = getEmbeddedState();

    this.hasEmbeddedLinks = Boolean(
      embeddedState && embeddedState.status === "loaded",
    );

    this.state = embeddedState || {
      links: [],
      status: "loading",
    };
  }

  render() {
    const {
      data: { description, linklogErrorMessage, subtitle, title, url },
    } = this.props;
    const { links, status } = this.state;
    const hasLinks = Array.isArray(links) && links.length > 0;
    const showError = !hasLinks && status === "error";
    const showLoading = !hasLinks && status === "loading";
    let content = null;

    if (hasLinks) {
      content = (
        <ul>
          {links.map((item) => {
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
      content = linklogErrorMessage;
    } else if (showLoading) {
      content = "Loading…";
    }

    const siteName = `${title} | ${subtitle}`;
    const pageTitle = `${siteName} | Linklog`;
    const pageUrl = `${url}/linklog/`;
    const socialImage = `${url}/social.png`;
    const { canonical, meta } = buildSocialMeta({
      description,
      image: socialImage,
      siteName,
      title: pageTitle,
      url: pageUrl,
    });

    return (
      <main
        aria-labelledby="page-title"
        className="Main"
        id="main"
        tabIndex="-1"
      >
        <PageMeta
          canonical={canonical}
          description={description}
          meta={meta}
          title={pageTitle}
        />
        <section>
          <h2 id="page-title" translate="no">
            Linklog
          </h2>
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

    if (this.hasEmbeddedLinks) {
      return;
    }

    if (typeof fetch !== "function") {
      this.setState({ status: "error" });

      return;
    }

    this.setState({ status: "loading" });

    fetch(api)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        return res.json();
      })
      .then((json) => {
        if (Array.isArray(json)) {
          if (json.length === 0) {
            this.setState({ status: "error" });

            return;
          }

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
