const buildSocialMeta = ({
  description,
  image,
  siteName,
  title,
  type = "website",
  url,
}) => ({
  canonical: url,
  meta: {
    name: {
      "twitter:card": "summary_large_image",
      "twitter:description": description,
      "twitter:image": image,
      "twitter:title": title,
    },
    property: {
      "og:description": description,
      "og:image": image,
      "og:site_name": siteName,
      "og:title": title,
      "og:type": type,
      "og:url": url,
    },
  },
});

module.exports = { buildSocialMeta };
