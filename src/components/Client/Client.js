import React from "react";

const Client = ({ client: { link, title } }) => {
  return title ? (
    <p>
      <strong>For:</strong> {!link ? title : <a href={link}>{title}</a>}
    </p>
  ) : null;
};

export default Client;
