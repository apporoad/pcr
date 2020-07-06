#!/usr/bin/env node

require('history.node').record('pcr')



var program = require('commander');

var cc = require('cli.config.js').system('pcr')

var main = require('./index')
var config = cc.get()

var currentPath = process.cwd()
//  node run.js -d F:\test\ggenerator/d.zip -p test -t F:\test\ggenerator\tgt
//get params
program.version(require('./package.json').version)

program.command('serve')
    .description('开始跑脚本任务')
    .option('-s,--script <script>')
    .action((options) => {
        if(options.script){
            config.script = options.script
        }
        main.serve(config)
    })


program.command('tasks')
    .description('根据用户，批量生成任务')
    .option('-t,--type <type>' , '任务类型')
    .option('-n,--name [name]', '任务名称')
    .option('-i,--scriptIndex [scriptIndex]','任务对应脚本的位置，从1开始',parseInt)
    .action(options =>{
        main.addTasks(config,options.name,options.type,options.scriptIndex)
    })