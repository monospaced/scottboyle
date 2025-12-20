const safeHref = (value, base) => {
  try {
    const url = base ? new URL(String(value), base) : new URL(String(value));
    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.toString();
    }
  } catch (err) {
    return null;
  }
  return null;
};

module.exports = { safeHref };
