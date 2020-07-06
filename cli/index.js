// const log = require('simple-node-logger').createSimpleLogger('pcr.log')
const utils = require('lisa.utils')
const child_process = require('child_process')
//todo log

const req = require('mini.req.js');

const sleep = (timeountMS) => new Promise((resolve) => {
    setTimeout(resolve, timeountMS);
})

const getPostion = (index)=>{
    index = index ||1
    index = index < 1 ? 1 : index
    return {
        left : 364,
        top :  144 + 35* (index -1)
    }
}

const run = (scriptPath, machineName, scriptIndex) => {
    //AutoHotkeyU64 ahk/pcr.ahk m1 364 144
    var postion = getPostion(scriptIndex)
    var cmd = `AutoHotkeyU64 ${scriptPath} ${machineName} ${postion.left} ${postion.top}`
    console.log(cmd)
    var p = child_process.exec(cmd, (err, out, stdErr) => {
        if (err) {
            console.log('脚本出错： ' + cmd)
            console.log('请确保 AutoHotkeyU64 全局可用')
        } else {
            console.log('执行脚本成功：' + machineName)
            console.log(out)
        }
    })

    p.stdout.on('data', function (data) {
        console.log(data);
    })
    p.stderr.on('data', function (data) {
        //console.log('error in aok: ' + data);
    })
}

exports.serve = async (config) => {
    config = config || {}
    config.url = 'http://localhost:11540/'
    config.interval = 1000

    console.log('开始跑《公主连接》主..........')

    //获取所有主机
    var hosts = await req.get(config.url + 'hosts')

    //开始循环寻找空闲的机器和可执行的任务
    var today = (new Date()).toLocaleDateString().replace(/-/g, '/')
    while (true) {
        //获取doing任务
        //http://localhost:11540/tasks?status=doing&date=2020/7/6
        var doingTasks = await req.get(config.url + 'tasks?status=doing&date=' + today)

        //找到free 主机
        var freehosts = utils.ArrayRemove(hosts, doingTasks, (a, b) => {
            return b.worker == a.name
        })
        console.log('free host : ' + JSON.stringify(freehosts))
        if (freehosts.length > 0) {
            //找到未执行任务
            var todoTasks = await req.get(config.url + 'tasks?status=todo&date=' + today)
            //判断筛选出当前主机能运行的任务
            var availableTasks = utils.ArrayFilter(todoTasks, null, (a, b) => {
                //console.log(JSON.stringify(b))
                if (!b.worker) {
                    return true
                }
                if (utils.ArrayContains(freehosts, b, (a, b) => {
                        return b.name == a.worker
                    })) {
                    return true
                }
                return false
            })
            if (availableTasks.length > 0) {
                var task = availableTasks[0]
                console.log('发现可执行任务：' + JSON.stringify(task))

                // 执行脚本
                var scriptPath = config.script || ( __dirname + '/pcr.ahk')
                run(scriptPath,task.worker,task.scriptIndex)

                //设置任务状态为todoing
                await req.put(config.url + 'tasks?index=' + task.index , { status : "todoing"})
            }

        }
        await sleep(config.interval)
    }

}

exports.addTasks = (config,name,type,scriptIndex,date)=>{
    config = config || {}
    config.url = 'http://localhost:11540/'

    //获取账号信息
    var accounts = await req.get(config.url + '/account')
    var today = (new Date()).toLocaleDateString().replace(/-/g, '/')
    if(accounts && accounts.length>0){
        for(var i=0;i<accounts.length;i++){
            var acc = accounts[i]
            await req.post(config.url + '/tasks', {
                name : name|| 'default',
                type : type || 'default',
                status : 'login',
                user : acc.name,
                pwd : acc.pwd,
                date :  date || today,
                worker : acc.host,
                scriptIndex : scriptIndex || 1
            })
        }
    }
    //{"index":5,"name":"loginTask","type":"login","status":"doing","user":"lcoa2853","pwd":"save11","date":"2020/7/6","worker":"m1","endTime":"","startTime":"20:51:26 GMT+0800 (CST)"}

}

//exports.serve()