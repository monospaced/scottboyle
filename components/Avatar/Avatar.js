import React from 'react';
import './Avatar.css';

const Avatar = () => {
  const image = require(`../../assets/avatar.png`);
  return (
    <h2 className="Avatar">
      <img
        alt="About Scott"
        width={(image.width / 2) + 2}
        height={(image.height / 2) + 2}
        src={`/assets/${image.src}`}
      />
    </h2>
  );
};

export default Avatar;
