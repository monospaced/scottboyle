import React, {Component} from 'react';
import './Screenshot.css';

class Screenshot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
    };
    this.imageWillLoad = this.imageWillLoad.bind(this);
  }
  render() {
    const {slug, project: {link, title}} = this.props;
    const image = require(`../../assets/${slug}.png`);
    const img = (
      <img
        className={`Screenshot${!this.state.loaded ? ' is-loading' : ''}`}
        alt={title}
        width="400"
        height={`${(image.width > 398 ? image.height / 2 : image.height) + 2}`}
        src={`/assets/${slug}.png`}
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
  componentDidMount() {
    this.imageWillLoad();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.imageWillLoad(nextProps);
    }
  }
  imageWillLoad(nextProps) {
    const {slug} = nextProps || this.props;
    const img = document.createElement('img');
    this.setState({loaded: false});
    img.onload = () => {
      this.setState({loaded: true});
    };
    img.src = `/assets/${slug}.png`;
  }
}

export default Screenshot;
