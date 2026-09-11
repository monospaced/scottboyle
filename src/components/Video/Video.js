import React, { Component } from "react";

import "./Video.css";

class Video extends Component {
  constructor(props) {
    super(props);
    this.video = React.createRef();
    this.motionQuery = null;
    this.state = { loaded: false };
    this.updatePlayback = this.updatePlayback.bind(this);
    this.videoDidLoad = this.videoDidLoad.bind(this);
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
    const media = (
      <div
        className={`Video${loaded ? " is-loaded" : ""}`}
        style={{ width: `${width}px` }}
      >
        <div
          className="Video-shim"
          style={{ paddingTop: `${(height / width) * 100}%` }}
        />
        <video
          aria-label={title}
          className="Video-media"
          height={height}
          loop
          muted
          onLoadedData={this.videoDidLoad}
          playsInline
          preload="auto"
          ref={this.video}
          src={require(`../../assets/${slug}.mp4`)}
          translate="no"
          width={width}
        />
      </div>
    );

    if (link) {
      return (
        <a className="VideoLink" href={link}>
          {media}
        </a>
      );
    }
    return media;
  }

  componentDidMount() {
    this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.motionQuery.addEventListener("change", this.updatePlayback);
    this.updatePlayback();

    // On a full page load the server-rendered video can emit `loadeddata`
    // before hydration attaches the handler, so sync from the current
    // readyState to avoid missing the reveal and leaving the video hidden.
    const video = this.video.current;
    if (video && video.readyState >= video.HAVE_CURRENT_DATA) {
      this.videoDidLoad();
    }
  }

  componentWillUnmount() {
    if (this.motionQuery) {
      this.motionQuery.removeEventListener("change", this.updatePlayback);
    }
  }

  updatePlayback() {
    const video = this.video.current;
    if (!video) {
      return;
    }
    // Some browsers only honour autoplay when muted is set on the property.
    video.muted = true;
    if (this.motionQuery && this.motionQuery.matches) {
      video.pause();
    } else {
      const playback = video.play();
      if (playback && playback.catch) {
        playback.catch(() => {});
      }
    }
  }

  videoDidLoad() {
    this.setState({ loaded: true });
  }
}

export default Video;
