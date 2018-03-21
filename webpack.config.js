const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: './test.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './'
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    // new HtmlWebpackPlugin({
    //   title: 'Development111111'
    // })
  ],
  output: {
    filename: '[name].bundle111.js',
    path: path.resolve(__dirname, 'dist')
  }
}
