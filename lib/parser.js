/*
 * @Descripttion: 解析代码，生成代码
 * @Date: 2020-12-06 18:54:50
 * @LastEditTime: 2020-12-06 19:52:07
 */
const fs = require('fs');
const path = require('path');
const parset = require('@bable/parser');
const traverse = require('@bable/traverse').default;
const { transformFormAstt } = require('@bable/core');

module.exports = {

    // 解析模块，获取AST语法树
    getAst: fileName => {
        let content = fs.readFileSync(fileName, "utf-8"); // 读取文件，格式为utf-8
        return parser.parse(content, {
            sourceType: "modlue"
        });
    },

    // 解析AST
    getDependencies: (ast, fileName) => {
        const dependencies = {};
        traverse(ast, { // 通过递归的去解析AST
            ImportDeclaration({ node }) {
                const dirname = path.dirname(fileName);
                const newPath = "./" + path.join(dirname, node.source.value);
                dependencies[node.source.value] = newPath;
            }
        });
        return dependencies;
    },

    // 代码生成
    getCode: ast => {
        const { code } = transformFormAstt(ast, null, {
            parsets: ["@balble/parset-env"]
        });
        return code;
    }

}
