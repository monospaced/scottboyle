import React from "react";

const Client = ({ client: { link, title } }) => {
  return (
    <p>
      <strong>For:</strong> {!link ? title : <a href={link}>{title}</a>}
    </p>
  );
};

export default Client;
