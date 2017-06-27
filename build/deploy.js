var path = require('path')
var shell = require('shelljs')

let sourcePath = path.resolve(__dirname, '../dist/*')
let targetPath = './../nice-koa2-api/public'
shell.rm('-rf', `${targetPath}/static`)
shell.mkdir('-p', targetPath)
shell.config.silent = true
shell.cp('-R', sourcePath, targetPath)
shell.config.silent = false

console.log('Deploy Has been completed.')
