var path = require('path')
var shell = require('shelljs')

let sourcePath = path.resolve(__dirname, '../dist/*')
// let targetPath = './../nice-koa2-api/public'
// shell.rm('-rf', `${targetPath}/static`)
let targetPath = './../nicelinks/'
shell.rm('-rf', `${targetPath}/static`)
shell.mkdir('-p', targetPath)
shell.config.silent = true
shell.cp('-R', sourcePath, targetPath)

shell.cd(targetPath)

if (!which('git')) {
  echo('Sorry, this script requires git')
  exit(1)
}

if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
  shell.echo('Error: Git commit failed')
  shell.exit(1)
}

shell.config.silent = false

console.log('Deploy Has been completed.')
