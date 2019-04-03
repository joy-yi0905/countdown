var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    ['countdown']: path.resolve(__dirname, './src/res/js/countdown.js')
  },
  output: {
    path: path.resolve(__dirname, './demo'),
    filename: '[name].min.js',
    libraryTarget: 'umd',
    library: 'Countdown'
  },

  devServer: {
    inline: true,
    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },

      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              publicPath: 'images/', // 自定义 css文件 公用目录
              outputPath: 'images/', // 文件存放目录
              name: '[name].[ext]?[hash:8]',
              limit: 8192
            } 
          }
        ]
      },

      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/demo.html',
      inject: 'head'
    })
  ]
};