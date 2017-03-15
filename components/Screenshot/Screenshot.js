import React, {Component} from 'react';
import './Screenshot.css';

class Screenshot extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: true };
  }
  render() {
    const {slug, project: {link, title, image}} = this.props;
    const img = (
      <div className={`Screenshot${!this.state.loaded ? ' is-loading' : ''}`} style={{ width: `${image.width}px` }}>
        <div
          className="Screenshot-shim"
          style={{
            paddingTop: `${(image.height / image.width) * 100}%`,
          }}
        ></div>
        <img
          className="Screenshot-image"
          alt={title}
          width={image.width}
          height={image.height}
          src={require(`../../assets/${slug}.jpg`)}
          onLoad={this.handleImageLoaded.bind(this)}
        />
      </div>
    );
    if (link) {
      return (
        <a href={link}>
          {img}
        </a>
      );
    }
    return img;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({ loaded: false });
    }
  }
  handleImageLoaded() {
    this.setState({ loaded: true });
  }
}

export default Screenshot;
