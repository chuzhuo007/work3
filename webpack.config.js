//插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//path是一个和路径有关的模块，用于处理文件路径和目录路径，可以通过如下方式引入使用：
const { resolve,json} = require('path');
module.exports = {
  //必须有mode属性
  mode: 'development',
  entry: './src/index.js',
  output: {
    //__dirname 当前文件夹路径，'./dist'文件名称  resolve避免不同系统中的斜杠不同
    path: resolve(__dirname, './dist'),
    // filename: 'bundle.js',
    clean: true,
  },
  //引入插件
  plugins: [
    //自动打包所有资源,引入到dist文件夹中的index.html
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  //less-loader将less文件解析成cs文件 css-loader将cs执行文件内容整合到js文件中
  //style-loader，在js中找到cs代码创建style标签放到页面上
  module: {
    rules: [
      {
        test: /\.less$/,
        //要使用多个loader用use
        use:['style-loader',
        'css-loader',
        'less-loader']
      },
      //处理图片资源
      //下载两个包 url-loader file-loader
      {
        // test : /\.(png|jpg|git)$/,
        //一个loader就用loader
        test: /\.(png|jpe?g|gif|svg?)$/,
  
        type: "asset/resource",
        generator: {
          //图片路径，存放在dist/imgs/原名+8位hash+后缀
          // filename: "images/[name]_[hash:8][ext]"
          filename: "images/[name]_[hash:8][ext]"

      },
    },
    {
      test: /\.html$/,
      /**
       * html-loader可以处理html中的img图片，可负责将其中的图片引入，
       * 然后交由url-loader进行解析
       */
      loader: 'html-loader',
      options: {
        esModule: false
      }
    },
    ]
  },
  devServer: {
    static: './dist',
  },
  optimization: {
    runtimeChunk: 'single',
  },
};