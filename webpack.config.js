require("@babel/polyfill");
require('es6-promise').polyfill();
require('isomorphic-fetch');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
require("babel-register");

// Webpack Configuration
const config = {
  // Entry
  entry: ["whatwg-fetch",'@babel/polyfill','./js/index.js','./js/headline.js'],
  
  // Output
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
    template: './index.html'
    })],
  // Loaders
  module: {
    rules : [
      // JavaScript/JSX Files
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      // CSS Files
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
         test: /\.ts$/, 
         use: 'ts-loader' 
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
            'file-loader'
        ]
      }
    ]
  }
};
// Exports
module.exports = config;