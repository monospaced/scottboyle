const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin");

module.exports = () => {
  // Prevent webpack from attempting to process css before loaders are configured
  require.extensions[".css"] = () => {};

  // Allow webpack config-time requires (routes/components) to load ESM/JSX files.
  require("@babel/register")({
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: ["@babel/plugin-transform-object-rest-spread"],
  });

  // Route list is required in config.plugins
  const routesModule = require("./src/scripts/routes");
  const routes = routesModule.routePaths;

  const config = {
    devServer: {
      client: false,
      historyApiFallback: true,
      hot: false,
      liveReload: false,
      static: { directory: path.resolve(__dirname, "build"), watch: true },
    },
    entry: "./src/scripts/entry.js",
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: filePath =>
            /node_modules/.test(filePath) &&
            !/react-router-dom|react-router|@remix-run[\\/]router/.test(filePath),
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-transform-object-rest-spread"],
          },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { importLoaders: 1 } },
            "postcss-loader",
          ],
        },
        {
          test: /\.woff$/,
          type: "asset/resource",
          generator: { filename: "[name][ext]" },
        },
        {
          test: /\.(jpg)$/,
          type: "asset/resource",
          generator: { filename: "assets/[name][ext]" },
        },
        {
          test: /_redirects$/,
          type: "asset/resource",
          generator: { filename: "[name][ext]" },
        },
        {
          test: /\/\.well-known\/.*\.txt$/,
          type: "asset/resource",
          generator: { filename: ".well-known/[name][ext]" },
        },
        {
          test: /\.(ico|png|svg|txt|webmanifest|xml)$/,
          exclude: /\/\.well-known\//,
          type: "asset/resource",
          generator: { filename: "[name][ext]" },
        },
      ],
    },
    optimization: {
      minimizer: ["...", new CssMinimizerPlugin()],
    },
    output: {
      filename: "bundle.js",
      globalObject: "this",
      library: { type: "umd" },
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
      clean: true,
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: "styles.css" }),
      new StaticSiteGeneratorPlugin("bundle.js", routes),
    ],
    stats: "minimal",
  };

  return config;
};
