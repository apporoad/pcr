#!/usr/bin/env node

require('history.node').record('pcr')



var child_process = require('child_process')
var program = require('commander');
var path = require('path')
var cc = require('cli.config.js').system('pcr')

var main = require('./index')
var config = cc.get()

//  node run.js -d F:\test\ggenerator/d.zip -p test -t F:\test\ggenerator\tgt
//get params
program.version(require('./package.json').version)

program.command('job')
    .description('开始跑脚本任务')
    .option('-s,--script <script>')
    .action((options) => {
        if(options.script){
            config.script = options.script
        }
        main.job(config)
    })


program.command('tasks')
    .description('根据用户，批量生成任务')
    .option('-t,--type <type>' , '任务类型')
    .option('-m,--taskName [name]', '任务名称')
    .option('-s,--status [status]', '状态， 默认todo ，录制脚本时，请用todoing')
    .option('-i,--scriptIndex [scriptIndex]','任务对应脚本的位置，从1开始',parseInt)
    .action(options =>{
        //console.log(options.taskName)
        main.addTasks(config,options.taskName,options.type,options.scriptIndex,null ,options.status)
        console.log('添加任务成功，请查看http://localhost:8000/tasks.html')
    })
program.command('delTasks')
    .description('删除所有任务')
    .action(options =>{
        main.delTasks(config)
        console.log('删除所有任务 http://localhost:8000/tasks.html')
    })



program.command('serve')
    .description('开始pcr服务')
    .option('-m,--mount <mount>')
    .option('-p --port [value]', '端口号，默认是8000')
    .action((options) => {
        var apiPath = path.resolve(process.cwd(), options.mount || '.') 
        var sPath = path.join(__dirname, 'static')
        var port = options.port || '8000'
        var cmd = `aok ${apiPath}  -s  ${sPath}  -p ${port}  -x`
        //console.log(cmd)
        var aokProcess = child_process.exec(cmd, (err, out, stdErr) => {
            if (err) {
                console.log('执行aok出错： ' + cmd)
                console.log("如果没有安装aok.js 请执行 sudo npm install  -g aok.js")
            } else {
                console.log(out)
                // run(ws, static)
            }
        })

        aokProcess.stdout.on('data', function (data) {
            console.log(data);
        })
        aokProcess.stderr.on('data', function (data) {
            console.log('error in aok: ' + data);
        })

    })


program.parse(process.argv)