import feed from "./feed.mock.json";

export default (url, callback) => {
  return new Promise((resolve, reject) => {
    typeof url === "string"
      ? resolve({ json: () => Promise.resolve(feed) })
      : reject(new Error("failed"));
  });
};
