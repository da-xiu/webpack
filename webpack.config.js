/*
 * @Descripttion: 配置文件
 * @Date: 2020-12-06 18:54:38
 * @LastEditTime: 2020-12-06 19:33:33
 */
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './dist')
    }
}