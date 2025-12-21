module.exports = {
  plugins: [
    require("postcss-import")(),
    require("postcss-cssnext")({
      features: {
        customProperties: { preserve: true },
      },
    }),
  ],
};
