import React from 'react';
import './Screenshot.css';

const Screenshot = ({slug, project: {link, title}}) => {
  const image = (
    <img
      className="Screenshot"
      alt={title}
      width="400"
      src={require(`../../assets/${slug}.png`)}
    />
  );
  if (link) {
    return (
      <a href={link}>
        {image}
      </a>
    );
  }
  return image;
};

export default Screenshot;
