import React, {Component} from 'react';
import './Screenshot.css';

class Screenshot extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: true };
  }
  render() {
    const {slug, project: {link, title}} = this.props;
    const image = require(`../../assets/${slug}.jpg`);
    const img = (
      <div style={{
        maxWidth: '100%',
        width: `${(image.width / 2) + 2}px`,
        height: `${(image.height / 2) + 2}px`,
      }}>
        <img
          className={`Screenshot${!this.state.loaded ? ' is-loading' : ''}`}
          alt={title}
          width={`${image.width / 2}`}
          height={`${image.height / 2}`}
          src={`/assets/${slug}.jpg`}
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
