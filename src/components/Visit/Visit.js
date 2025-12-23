import React from "react";

const Visit = ({ project: { link, title } }) => {
  return link && title ? (
    <p className="Visit">
      <strong>Visit:</strong>{" "}
      <a href={link} translate="no">
        {title}
      </a>
    </p>
  ) : null;
};

export default Visit;
