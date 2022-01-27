const path = require('path')
// 导入插件
const HtmlPlugin = require('html-webpack-plugin')
// 创建实例对象
const htmlPlugin = new HtmlPlugin({
    template: './src/index.html', // 指定源文件的存放路径
    filename: './index.html', // 指定生成的文件的存放路径
})
// 使用Node.js 中的到处语法，向外导出一个 webpack 的配置对象
module.exports = {
    mode: "development", // mode 用来指定构建模式。可选值 development 和 production
    // 指定编译js
    entry: path.join(__dirname, './src/index.js'),
    // 输出指定文件夹和文件
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js"
    },
    // 引入插件 webpack运行时，加载插件
    plugins: [htmlPlugin],
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
            // 处理图片文件
            {test: /\.jpg|png|gif$/, use: ['url-loader?limit=111']}
        ]
    }
}