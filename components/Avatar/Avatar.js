import React from 'react';
import './Avatar.css';
import {version} from '../../package.json';

const Avatar = () => {
  return (
    <h2 className="Avatar">
      <img
        alt="About Scott"
        width="94"
        height="94"
        src={`/assets/avatar.png?v=${version}`}
      />
    </h2>
  );
};

export default Avatar;
