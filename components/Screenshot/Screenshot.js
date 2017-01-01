import React from 'react';
import './Screenshot.css';

const Screenshot = ({slug, project: {link, title}}) => {
  const image = require(`../../assets/${slug}.png`);
  const img = (
    <img
      className="Screenshot"
      alt={title}
      width="400"
      height={`${(image.width > 398 ? image.height / 2 : image.height) + 2}`}
      src={`/assets/${image.src}`}
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
};

export default Screenshot;
