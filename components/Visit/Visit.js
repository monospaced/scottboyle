import React from "react";

const Visit = ({ project: { link, title } }) => {
  return (
    <p>
      <strong>Visit:</strong> <a href={link}>{title}</a>
    </p>
  );
};

export default Visit;
