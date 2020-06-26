## install and Run

```bash
cd api
npm i 
cd ..

npm i -g aok.js

aok api -s static -x
```

## 查看任务状态
http://localhost:11540/tasks.html

## 获取一条任务
http://localhost:11540/task.html?type=abc

## 创建任务
```bash
curl -X POST -d "name=testTaskName&type=abc&status=todo&user=testUser&pwd=123456&date=2020/6/26&worker=m1"  http://localhost:11540/tasks
```