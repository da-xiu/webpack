/*
 * @Descripttion: 编译
 * @Date: 2020-12-06 18:55:21
 * @LastEditTime: 2020-12-06 19:37:16
 */
const fs = require('fs');
const path = require('path');
const { getAst, getDependcies, getCode } = require('./parser.js');

module.exports = class Compiler {
    constructor(options) { // options 配置文佳中的所有配置集合
        this.entry = options.entry;
        this.output = options.output;
        this.modules = [];
    }

    run() { // 入口调用模块
        const info = this.build(this.entry);
        this.modules.push(info);
        for (let i = 0; i < this.modules.length; i++) {
            const item = this.modules[i];
            const { dependencies } = item;
            if (dependencies) {
                for (let j in dependencies) {
                    this.modules.push(this.build(dependencies[j]));
                }
            }
        }
        // 转换数据结构
        const obj = {};
        this.modules.forEach(item => {
            obj[item.fileName] = {
                dependencies: item.dependencies,
                code: item.code
            }
        });
        this.file(obj)
    }
    // 获取，解析好的代码，依赖
    build(fileName) {
        let ast = getAst(fileName);
        let dependencies = getDependcies(ast, fileName);
        let code = getCode(ast);
        return {
            fileName,
            dependencies,
            code
        }
    }
 

    // 执行解析最后文件
    file(code) {
        // 获取输出信息
        const filePath = path.join(this.output.path, this.output.filename);
        const newCode = JOSN.stringfy(code);
        const bundle = `(function(graph) {
            function require(module) {
                function localRequire(relativePath) {
                    return require(graph[module].dependencies[relativePath])
                }

                var exports = {};
                (function(require, exports, code) {
                    eval(code)
                })(localRequire, exports, graph[module].code)
            return exports;
            }
            require('${this.entry}') // ./src/index.js
        })(${newCode})`;
        fs.writeFileSync(filePath, bundle, "utf-8")
    }
}