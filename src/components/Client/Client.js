import React from "react";

const Client = ({ client: { link, title } }) => {
  return title ? (
    <p className="Client">
      <strong>With:</strong>{" "}
      {!link ? (
        <span translate="no">{title}</span>
      ) : (
        <a href={link} translate="no">
          {title}
        </a>
      )}
    </p>
  ) : null;
};

export default Client;
