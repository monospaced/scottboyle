import React from "react";
import { Helmet } from "react-helmet-async";

const PageMeta = ({ canonical, description, meta = {}, noIndex, title }) => {
  const nameMeta = Object.entries(meta.name || {});
  const propertyMeta = Object.entries(meta.property || {});

  return (
    <Helmet>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {noIndex ? <meta name="robots" content="noindex" /> : null}
      {nameMeta.map(([name, content]) => (
        <meta key={`name:${name}`} content={content} name={name} />
      ))}
      {propertyMeta.map(([property, content]) => (
        <meta
          key={`property:${property}`}
          content={content}
          property={property}
        />
      ))}
    </Helmet>
  );
};

export default PageMeta;
