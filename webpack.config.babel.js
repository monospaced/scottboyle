import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ReactRouterToArray from 'react-router-to-array';
import webpack from 'webpack';

const production = process.env.NODE_ENV === 'production';

// Prevent webpack from attempting to process css before loaders are configured
require.extensions['.css'] = () => { return; };
// Routes array is required in config.plugins
const routes = ReactRouterToArray(require('./scripts/routes'));

const config = {
  entry: './scripts/entry.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [
            'es2015',
            'react',
          ],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css!postcss'),
      },
      {
        test: /\.woff$/,
        loader: 'url?mimetype=application/font-woff',
      },
      { test: /\.(jpg)$/,
        loader: 'image-size?name=/assets/[name].[ext]',
      },
      { test: /\.(ico|txt|htaccess)$/,
        loader: 'file?name=/[name].[ext]',
      },
      { test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new StaticSiteGeneratorPlugin('bundle.js', routes),
  ],
};

if (production) {
  config.plugins = [
    ...config.plugins,
    // Put react into production mode
    new webpack.DefinePlugin({
      'process.env': {
         NODE_ENV: `'production'`,
       },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ];
}

module.exports = config;
