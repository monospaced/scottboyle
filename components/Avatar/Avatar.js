import React from 'react';
import './Avatar.css';
import {version} from '../../package.json';

const Avatar = () => {
  const image = require(`../../assets/avatar.png`);
  return (
    <h2 className="Avatar">
      <img
        alt="About Scott"
        width="96"
        height="96"
        src={`/assets/avatar.png?v=${version}`}
      />
    </h2>
  );
};

export default Avatar;
