var path = require('path')
var shell = require('shelljs')

require('colors')

let sourcePath = path.resolve(__dirname, '../dist/*')
let targetPath = path.resolve(__dirname, '../../nicelinks/')

console.log('Start exec copy ...'.grey)

shell.rm('-rf', `${targetPath}static`)
shell.mkdir('-p', targetPath)
shell.config.silent = true
shell.cp('-R', sourcePath, `${targetPath}`)

console.log('Copy Has been completed.'.green)

shell.cd(targetPath)

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git')
  shell.exit(1)
}

console.log('Start exec Git auto commit')
shell.exec('git add .')

if (shell.exec('git commit -m "auto commit"').code !== 0) {
  shell.echo('Error: Git commit failed'.yellow)
  shell.exit(1)
} else {
  shell.exec('git push')
}

console.log('Deploy Has been completed .'.green)

shell.config.silent = false
