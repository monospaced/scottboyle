import React from 'react';
import './Avatar.css';

const Avatar = () => {
  const image = require(`../../assets/avatar.png`);
  return (
    <h2 className="Avatar">
      <img
        alt="About Scott"
        width="96"
        height="96"
        src={`/assets/${image.src}`}
      />
    </h2>
  );
};

export default Avatar;
