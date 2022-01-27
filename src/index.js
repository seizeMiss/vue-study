import $ from 'jquery'
// 加载css文件 需要 style-loader 和 css-loader 去处理
// 1.在webpack中，一切皆模块（都可以通过ES6导入语法进行导入），默认只能打包处理.js结尾的文件，处理不了其他或者的文件
// 2.会去webpack.config.js 找到 module.rule 数组，是否有配置对应的loader加载器
// 3.webpack 把index.css这个文件，先转交给最后一个loader进行处理(先转交给 css-loader)
// 4.当css-loader处理完毕, 会把处理的结果转交给下一个loader
// 5.当style-loader处理完毕，没有下一个loader，会把处理结果返回给webpack
// 6.webpack 把style-loader处理的结果，合并到 /dist/bundle.js中，生成打包后的文件
import './css/index.css'

// 导入less文件
import './css/index.less'

// 导入图片文件
import logo from './image/logo.png'
// logo 导入会转成 base64 图片
$('.box').attr('src', logo)

$(function () {
    $('li:odd').css('background-color', 'blue')
    $('li:even').css('background-color', 'green')
})
