//引入webpack-merge插件进行合并
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩代码

module.exports = {
    //模块参数
    mode: 'production',
    devtool: 'inline-source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin()
        ],
    },
}