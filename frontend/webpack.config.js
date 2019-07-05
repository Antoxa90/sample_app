const webpack = require( 'webpack' );
const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const autoprefixer = require( 'autoprefixer' );
// const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
// const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

const DEV_MODE = process.env.NODE_ENV === 'development';

module.exports = {
  entry: './src/index.tsx',
  output: {
    publicPath: '/',
    path: path.resolve( __dirname, 'dist' ),
    filename: '[name].[contenthash].js'
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader' // DEV_MODE ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: DEV_MODE
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer( {
                  overrideBrowserslist: ['last 4 versions', '> 1%']
                } )
              ],
              sourceMap: DEV_MODE
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: DEV_MODE
            }
          }
        ]
      },
      {
        test: /\.(svg|woff|woff2|eot|ttf|otf|csv|pdf|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name]-[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: !DEV_MODE
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin( {
      DEV_MODE,
    } ),
    new HtmlWebpackPlugin( {
      template: './index.html',
      favicon: 'favicon.ico',
      inject: 'body'
    } ),
    // new MiniCssExtractPlugin( {
    //   filename: '[name].[contenthash].css',
    // } ),
    // new OptimizeCssAssetsPlugin()
  ],
  mode: DEV_MODE ? 'development' : 'production'
};