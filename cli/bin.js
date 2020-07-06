#!/usr/bin/env node

require('history.node').record('pcr')



var program = require('commander');

var cc = require('cli.config.js').system('pcr')
    .default({

    })

var main = require('./index')
var config = cc.get()

var currentPath = process.cwd()
//  node run.js -d F:\test\ggenerator/d.zip -p test -t F:\test\ggenerator\tgt
//get params
program.version(require('./package.json').version)

program.command('serve')
    .description('开始跑脚本任务')
    .option('-m,--mount <mount>')
    .option('-p --port [value]', '端口号，默认是11546')
    .action((options) => {
        var apiPath = path.join(__dirname, 'api')
        var sPath = path.resolve(process.cwd(), options.mount || '.')
        var port = options.port || '11546'
        var cmd = `aok ${apiPath}  -s  ${sPath}  -p ${port}`
        var aokProcess = child_process.exec(cmd, (err, out, stdErr) => {
            if (err) {
                console.log('执行aok出错： ' + cmd)
                console.log("如果没有安装aok.js 请执行 sudo npm install  -g aok.js")
            } else {
                console.log(out)
                run(ws, static)
            }
        })

        aokProcess.stdout.on('data', function (data) {
            console.log(data);
        })
        aokProcess.stderr.on('data', function (data) {
            //console.log('error in aok: ' + data);
        })

    })