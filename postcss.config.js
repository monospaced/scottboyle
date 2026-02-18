module.exports = {
  plugins: [
    require("postcss-import")(),
    require("postcss-preset-env")({
      features: {
        "custom-properties": { preserve: true },
        "custom-media-queries": true,
      },
      stage: 3,
    }),
  ],
};
