const path = require('path')
// 导入插件
const HtmlPlugin = require('html-webpack-plugin')
// 创建实例对象
const htmlPlugin = new HtmlPlugin({
    template: './src/index.html', // 指定源文件的存放路径
    filename: './index.html', // 指定生成的文件的存放路径
})
// 结构赋值
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const cleanPlugin = new CleanWebpackPlugin()
// 使用Node.js 中的导出语法，向外导出一个 webpack 的配置对象
module.exports = {
    mode: "development", // mode 用来指定构建模式。可选值 development 和 production
    // devtool: 'eval-source-map', // 保证出错的的时候，浏览器显示错误的行号是源代码的行号,在生成环境要关闭
    // devtool: 'nosources-source-map', // 实际生成环境设置的值，可以保证代码被压缩
    devtool: 'source-map', // 报错是否行号和源代码都显示
    // 指定编译js
    entry: path.join(__dirname, './src/index.js'),
    // 输出指定文件夹和文件
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "js/bundle.js"
    },
    // 引入插件 webpack运行时，加载插件
    plugins: [
        htmlPlugin,
        cleanPlugin
    ],
    devServer: {
        open: true,
        host: '127.0.0.1',
        port: 8080
    },
    module: { // 所有第三方文件模块的匹配规则
        rules: [ // 文件后缀名的匹配规则
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            // 处理less文件
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            // 处理图片文件,在配置 url-loader 的时候，多个参数之间，使用 & 符号进行分隔
            {test: /\.jpg|png|gif$/, use: ['url-loader?limit=200&outputPath=images']}, // 大于200byte 的则不转成base64
            // 使用babel-loader 处理高级的 js 语法
            // 在babel-loader 的时候，一定要排除node_modules目录中的js文件，因为第三方包的js兼容性，已被处理好
            {test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/}
        ]
    },
    resolve: {
        alias: {
            // 表示 @ 符号代表src根目录
            '@': path.join(__dirname, './src/')
        }
    }
}