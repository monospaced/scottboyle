const fetchWithTimeout = (url, delay, userAgent) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), delay);

  return fetch(url, {
    headers: { "User-Agent": userAgent },
    signal: controller.signal,
  }).finally(() => {
    clearTimeout(timeout);
  });
};

module.exports = { fetchWithTimeout };
