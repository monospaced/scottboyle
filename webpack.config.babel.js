import ReactRouterToArray from "react-router-to-array";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import StaticSiteGeneratorPlugin from "static-site-generator-webpack-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import webpack from "webpack";

module.exports = () => {
  // Prevent webpack from attempting to process css before loaders are configured
  require.extensions[".css"] = () => {};

  // Routes array is required in config.plugins
  const routes = ReactRouterToArray(require("./src/scripts/routes"));

  const config = {
    devServer: { historyApiFallback: true, inline: false, stats: "minimal" },
    entry: "./src/scripts/entry.js",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: { presets: ["env", "react"] },
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
          loader: "url-loader?mimetype=application/font-woff",
        },
        {
          test: /\.(jpg)$/,
          loader: "file-loader",
          options: { name: "assets/[name].[ext]" },
        },
        {
          test: /\.htaccess$/,
          loader: "file-loader",
          options: { name: "[name]" },
        },
        {
          test: /\.(ico|png|svg|webmanifest|xml)$/,
          loader: "file-loader",
          options: { name: "[name].[ext]" },
        },
      ],
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({ cache: true, parallel: true }),
        new OptimizeCSSAssetsPlugin(),
      ],
    },
    output: {
      filename: "bundle.js",
      globalObject: "this",
      libraryTarget: "umd",
      path: __dirname + "/build",
      publicPath: "/",
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: "styles.css" }),
      new StaticSiteGeneratorPlugin("bundle.js", routes),
    ],
    stats: "minimal",
  };

  return config;
};
