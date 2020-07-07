# pcr


## install
ahk
雷电 
node

以上均配置环境变量

```bash
npm i -g aok.js
npm i -g pcr.js
```

## 初始化文件

```bash
mkdir data

# 添加扩展
cd data
npm i csv.aok

# 创建账号，字段顺序随便
echo name,pwd,remark,email,host> account.csv

# 创建机器列表
echo name> hosts.csv

# 创建任务列表
echo name,type,status,user,pwd,date,worker,endTime,startTime,scriptIndex> tasks.csv

```

## 模拟器准备
尽量根据实际资源情况开服务，改名为 m1 、 m2 等等  
改的名字需要 添加到 hosts.csv内

## 账号准备
填写account.csv   
1. name ： 登录名  
2. pwd :  。。  
3. remark : 备注，没啥用
4. email ： 邮箱地址，没啥用
5. host ： 指定的主机名，如 上面的m1 ，当然如果这个账号可以不指定主机，那么分配时将任何主机都能跑

## 启动
1. 启动各种模拟器，并准备好脚本
2. 进入浏览器，打开  http://你服务器ip:8000/task.html
3. 设置服务器名称， 同模拟器名称，如m1 
4. 修改脚本，将脚本中的api地址改为你实际地址
5. 启动pcr api服务
```bash
# 到data所在文件夹下
pcr serve

## 验证
# http://localhost:8000/task.html
# http://localhost:8000/tasks.html
```

6. 启动job
```bash
pcr job
```

7. 新增任务
```bash

# 任务类型一定要跟对应脚本位置内部 的 type 相同
pcr tasks -t testType -n testName -i 1 
```

## 如何录制脚本
1. http://你服务器ip:8000/task.html?type=你任务指定Type
