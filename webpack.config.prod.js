var path = require('path');

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    ['countdown']: path.resolve(__dirname, './src/res/js/countdown.js'),
  },
  output: {
    path: path.resolve(__dirname, './demo'),
    filename: '[name].min.js',
    libraryTarget: 'umd',
    library: 'Countdown'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },

      {
        test: /\.(png|jpg|gif|eot|svg|ttf|woff)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[ext]?[hash:8]'
　　　 },

      {
        test: /\.html$/,
        loader: 'html-loader?minimize=false'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: './demo.html',
      template: __dirname + '/src/demo.html',
      inject: 'head'
    }),
    new CleanWebpackPlugin(
      [
        'demo'
      ]
    )
  ]
};