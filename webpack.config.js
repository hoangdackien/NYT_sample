var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'js');
 
var config = {
  entry: APP_DIR + '/bundle.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
     loaders: [
            { 
                test: /\.js?/,
                include: APP_DIR,
                loader: 'babel-loader'
            }
        ]
  },
  plugins: [
    
  ]
};
 
module.exports = config;