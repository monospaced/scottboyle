import React from "react";

const Visit = ({ project: { link, title } }) => {
  return link && title ? (
    <p>
      <strong>Visit:</strong> <a href={link}>{title}</a>
    </p>
  ) : null;
};

export default Visit;
