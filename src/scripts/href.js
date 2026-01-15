const safeHref = value => {
  const text = String(value || "");

  if (!text) {
    return null;
  }

  if (typeof URL !== "function") {
    return /^https?:\/\//.test(text) ? text : null;
  }

  try {
    const url = new URL(text);

    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.toString();
    }
  } catch (err) {
    return null;
  }
  return null;
};

module.exports = { safeHref };
