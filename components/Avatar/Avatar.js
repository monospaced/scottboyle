import React from 'react';
import './Avatar.css';
import {version} from '../../package.json';

const Avatar = () => {
  return (
    <h2 className="Avatar">
      <img
        className="Avatar-image photo"
        alt="About"
        width="94"
        height="94"
        src={`/assets/avatar.jpg?v=${version}`}
      />
    </h2>
  );
};

export default Avatar;
