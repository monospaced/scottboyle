import ExtractTextPlugin from "extract-text-webpack-plugin";
import ReactRouterToArray from "react-router-to-array";
import StaticSiteGeneratorPlugin from "static-site-generator-webpack-plugin";
import webpack from "webpack";

const production = process.env.NODE_ENV === "production";

// Prevent webpack from attempting to process css before loaders are configured
require.extensions[".css"] = () => {
  return;
};

// Routes array is required in config.plugins
const routes = ReactRouterToArray(require("./src/scripts/routes"));

const config = {
  devServer: { inline: false, stats: "minimal" },
  entry: "./src/scripts/entry.js",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: { presets: ["env", "react"] },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("css-loader!postcss-loader"),
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
      {
        test: /\.json$/,
        loader: "json-loader",
      },
    ],
  },
  output: {
    filename: "bundle.js",
    libraryTarget: "umd",
    path: __dirname + "/build",
    publicPath: "/",
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new StaticSiteGeneratorPlugin("bundle.js", routes),
  ],
  stats: "minimal",
};

if (production) {
  config.plugins = [
    ...config.plugins,
    // Put react into production mode
    new webpack.DefinePlugin({ "process.env": { NODE_ENV: `'production'` } }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
    }),
  ];
}

module.exports = config;
