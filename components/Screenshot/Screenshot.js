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
      <img
        className={`Screenshot${!this.state.loaded ? ' is-loading' : ''}`}
        alt={title}
        width="398"
        height={`${image.width === 796 ? image.height / 2 : image.height}`}
        src={`/assets/${slug}.jpg`}
        onLoad={this.handleImageLoaded.bind(this)}
      />
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
