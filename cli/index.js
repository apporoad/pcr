
const log = require('simple-node-logger').createSimpleLogger('pcr.log')
const utils = require('lisa.utils')
//todo log

const req = require('mini.req.js')

const sleep = (timeountMS) => new Promise((resolve) => {
  setTimeout(resolve, timeountMS);
})

exports.serve = async (config)=>{
    config = config || {}
    config.url = 'http://localhost:11540/'
    config.interval = 1000

    console.log('开始跑《公主连接》主..........')

    //获取所有主机
    var hosts = await req.get(config.url + 'hosts')
    
    //开始循环寻找空闲的机器和可执行的任务
    var today = (new Date()).toLocaleDateString().replace(/-/g,'/')
    while(true){
        
        //获取doing任务
        //http://localhost:11540/tasks?status=doing&date=2020/7/6
        var doingTasks = await req.get(config.url + 'tasks?status=doing&date=' + today)

        //找到free 主机
        var freehosts = utils.ArrayRemove(hosts , doingTasks , (a,b)=>{ return b.worker == a.name})
        console.log('free host : ' + JSON.stringify(freehosts))
        if(freehosts.length>0){
            //找到未执行任务
            var todoTasks = await req.get(config.url + 'tasks?status=todo&date=' + today)
            //判断筛选出当前主机能运行的任务
            var availableTasks = utils.ArrayFilter(todoTasks,null,(a,b)=>{
                //console.log(JSON.stringify(b))
                if(!a.worker){
                    return true
                }
                if(utils.ArrayContains(freehosts,b,(a,b)=>{  
                    return b.name == a.worker
                })){
                    return true
                }
                return false
            })
            if(availableTasks.length>0){
                var task = availableTasks[0]
                console.log('发现可执行任务：' + JSON.stringify(task))
                                
                // 执行脚本
                

                //设置任务状态为todoing
                //await req.put(config.url + 'tasks?index=' + task.index , { status : "todoing"})
            }
            
        }
        await sleep(config.interval)
    }

}

exports.serve()