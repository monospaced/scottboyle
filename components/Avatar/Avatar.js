import React from 'react';
import './Avatar.css';

const Avatar = () => {
  return (
    <h2 className="Avatar">
      <img
        alt="About Scott"
        width="96"
        height="96"
        src={require(`../../assets/avatar.png`)}
      />
    </h2>
  );
};

export default Avatar;
