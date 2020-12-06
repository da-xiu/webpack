/*
 * @Descripttion: 编译入口
 * @Date: 2020-12-06 18:54:29
 * @LastEditTime: 2020-12-06 19:51:26
 */
const Compiler = require('./lib/compiler');
const ooptions = require('./webpack.config.js');

new Compiler(options).run();
