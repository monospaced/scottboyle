import React, { Component } from "react";

import "./Screenshot.css";

class Screenshot extends Component {
  constructor(props) {
    super(props);
    this.image = React.createRef();
    this.state = { loaded: false };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.slug !== prevState.slug) {
      return { loaded: false, slug: nextProps.slug };
    }
    return null;
  }

  render() {
    const { loaded } = this.state;
    const {
      project: {
        image: { height, width },
        link,
        title,
      },
      slug,
    } = this.props;
    const img = (
      <div
        className={`Screenshot${loaded ? " is-loaded" : ""}`}
        style={{ width: `${width}px` }}
      >
        <div
          className="Screenshot-shim"
          style={{ paddingTop: `${(height / width) * 100}%` }}
        />
        <img
          alt={title}
          className="Screenshot-image"
          height={height}
          onLoad={this.imageDidLoad.bind(this)}
          ref={this.image}
          src={require(`../../assets/${slug}.jpg`)}
          width={width}
        />
      </div>
    );

    if (link) {
      return <a href={link}>{img}</a>;
    }
    return img;
  }

  componentDidMount() {
    this.image.current.src = require(`../../assets/${this.props.slug}.jpg`);
  }

  imageDidLoad() {
    this.setState({ loaded: true });
  }
}

export default Screenshot;
