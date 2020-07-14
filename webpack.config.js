const path = require('path')

const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: {
    main: ['./Z-PlugCoder/src/WindowPlug/window.js', 
          './Z-PlugCoder/src/TranslatePlug/translate.js',
          './Z-PlugCoder/src/Sprite/bird/bird.js',
          './Z-PlugCoder/src/TranslatePlug/inputTranslate.js'],
    config: ['./Z-PlugCoder/src/BookMark/bookMark.js', './Z-PlugCoder/Config/config.js']
  },
  output: {
    path: path.resolve(__dirname, './Z-PlugCoder/dist'), // 必须使用绝对地址，输出文件夹
    filename: '[name].js',
    publicPath: 'build/'
  },
  module: {
    rules: [
      // babel
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      // 图片格式正则
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            // 图片大小小于10000B的会转换成base64
            limit: 10000,
            name: 'images/[name].[hash].[ext]'
          }
        }]
      }
    ]
  },
  // 插件列表
  plugins: [
    new ExtractTextPlugin("css/[name].[hash].css")
  ]
}