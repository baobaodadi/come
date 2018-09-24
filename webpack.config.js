/* eslint-env node */
'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;
const merge = require('webpack-merge');
const devProxy = require('./devProxy');
const autoprefixer = require('autoprefixer');
// const pxtorem = require('postcss-pxtorem');
// const postcssflexibility = require('postcss-flexibility');

const buildPath = 'live';

const postcssOpts = {
  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
  plugins: () => [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
    // postcssflexibility()
  ],
}

module.exports = function (env) {
  let config = {
    entry: {
      shim: ['babel-polyfill', 'es6-shim', 'promise-polyfill'],
      // jquery:['jquery'],
      react: ['react', 'react-dom', 'prop-types', 'redux', 'redux-saga', 'react-redux', 'react-router'],
      // vendor: ['highcharts', 'lodash', 'moment'],
      index: './src/apps/index',
    },
    output: {
      filename: 'js/[name].[hash:7].js',
      path: path.resolve(__dirname, buildPath),
      // will be deployed to '/m/', should be '/' if test in local nginx
      publicPath: '/',
      // publicPath: '/pub/mall/static/',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [/src/, /node_modules\/dadify/],
          use: 'babel-loader',
        },
        // {
        //   test: require.resolve('jquery'),
        //   use: [{
        //     loader: 'expose-loader',
        //     options: 'jQuery'
        //   },{
        //     loader: 'expose-loader',
        //     options: '$'
        //   }]
        // },
        {
          test: /\.less$/i, use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: { modules: true, localIdentName: '[name]__[local]__[hash:base64:5]'} }, { loader: 'postcss-loader', options: postcssOpts }, 'less-loader'
            ]
          })
        },
        {
          test: /\.css$/i, use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: { minimize: true}}, { loader: 'postcss-loader', options: postcssOpts }
            ]
          })
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 100,
                name: 'images/[name].[hash:7].[ext]',
              },
            }
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'font/[name].[hash:7].[ext]',
              },
            }
          ]
        },
        // {
        //   test: /\.(rar|jar|zip)(\?.*)?$/,
        //   use: [
        //     {
        //       loader: 'url-loader',
        //       options: {
        //         limit: 1,
        //         name: 'files/[name].[hash:7].[ext]',
        //       },
        //     }
        //   ]
        // },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new ExtractTextPlugin('css/[name].[chunkhash:7].css'),
      new CSSSplitWebpackPlugin({size: 4000}),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['shim', 'react', 'vendor'],
      }),
      new webpack.optimize.CommonsChunkPlugin({ name: 'runtime' }),
      new HtmlWebpackPlugin({
        template: './src/apps/index.html',
      }),
      new webpack.DefinePlugin({
        'webapckEnv': '"' + (env.prod ? 'prod' : 'test') + '"',
        'global': 'window'
      }),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/)
    ],
  };

  if (env.dev) {
    config = merge(config, {
      devtool: '#eval-source-map',
      devServer: {
        port: 8888,
        https:false,
        historyApiFallback: true,
        disableHostCheck: true,
        contentBase: path.resolve(__dirname, 'div'),
        host: '0.0.0.0',
        proxy: devProxy[env.proxy],
      },
    })
  } else {
    config = merge(config, {
      plugins: [
        new CleanWebpackPlugin([buildPath]),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          },
        }),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        }),
      ],
    });
  }

  return config;
};
