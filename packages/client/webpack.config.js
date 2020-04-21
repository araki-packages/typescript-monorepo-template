const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');

/** @type {Parameters<typeof webpack>[0][0]} */
module.exports = { 
  entry: { renderer: path.resolve('src/entry.ts') },
  target: 'web',
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [ { loader: 'ts-loader' } ],
      },
      {
        test: /\.(fpc|mps|mpb|cxc|cxs|cxb|tga|glsl|vs|fs|jpg|png|gif|obj|mtl)$/,
        use: [ 
          { 
            loader: 'file-loader',
            options: { name: "[name].[ext]" }
          } 
        ],
      },
      {
        test: /\.mp3$/,
        use: [ 
          { 
            loader: 'file-loader',
            options: { name: "[name].[ext]" }
          } 
        ],
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
  },
  plugins: [
    new HtmlPlugin({
      template: path.resolve('src/index.html'), 
      inject: true
    })
  ],

  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: 'dist',
    inline: true,
    hot: true,
    overlay: true,
    port: 8181,
  },
};