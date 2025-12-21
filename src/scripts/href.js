const safeHref = value => {
  try {
    const url = new URL(String(value));

    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.toString();
    }
  } catch (err) {
    return null;
  }
  return null;
};

module.exports = { safeHref };
