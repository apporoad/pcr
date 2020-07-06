//https://github.com/zenorocha/clipboard.js
new ClipboardJS('.copy')

//保存事件
document.onkeydown = function (e) {
    e = window.event || e;
    var keycode = e.keyCode || e.which;
    if (e.ctrlKey && keycode == 83) {
        e.preventDefault();
        window.event.returnValue = false;
        //alert("as");
        btnSave_click();
    }
    if (keycode == 113) {
        //保存操作
        btnSave_click()
        var t = $("#txtPath").val();
        $("#txtPath").focus() //.val(t)
        // console.log(t.length)
        $("#txtPath")[0].setSelectionRange(0, t.length);
    }
}

pathKeyDown = () => {
    e = window.event || e;
    var keycode = e.keyCode || e.which;
    if (keycode == 13) {
        jump()
        return false
    }
    return true
}

//todo load
var orginText = ""
//保存按钮事件
var btnSave_click = function () {
    var text = $('#txtMain').val();
    if (orginText == text) {
        return;
    }
    orginText = text;
    var path = $("#txtPath").val();
    if (path.indexOf('/') != 0) {
        path = '/' + path
    }
    var data = {}
    data.value = text
    $.ajax({
        type: text ? 'put' : 'delete',
        url: '/data?node=' + path,
        data: data,
        success: function (data) {
            //alert(data.success);
            //alert('saved');
        },
        dataType: 'json',
        error: function (err) {
            //alert('err:'+JSON.stringify(err));
            console.log('err:' + JSON.stringify(err))
        }
    });
    return false;
}

function getHomePath() {
    var url = document.location.toString();
    var arrUrl = url.split("//");
    // only support pnote as subDir
    var start = arrUrl[1].indexOf("/");
    var path = arrUrl[0]
    path += arrUrl[1].substring(0, start || null)

    if (arrUrl[1].indexOf("/pnote/") > -1) {
        path += "/pnote/"
    }
    return path
}

function getUrlRelativePath() {
    var url = document.location.toString();
    var arrUrl = url.split("//");
    // only support pnote as subDir
    var start = arrUrl[1].indexOf("/");
    if (arrUrl[1].indexOf("/pnote/") > -1) {
        start += 6
    }
    var relUrl = arrUrl[1].substring(start); //stop省略，截取从start开始到结尾的所有字符

    if (relUrl.indexOf("?") != -1) {
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}



$(document).ready(function () {

    $('#txtWorker').val(localStorage.getItem('worker'))


    // var rPath = getUrlRelativePath()
    // console.log(rPath)
    var type = getQueryVariable('type')
    console.log('load query taskType :' + type)


});

function getData(url) {
    var returnVal = null
    $.ajax({
        type: 'get',
        url: url,
        async: false,
        success: function (data) {
            returnVal = data
        },
        dataType: 'json',
        error: function (err) {
            console.log(url)
            console.log('err:' + JSON.stringify(err))
        }
    })
    return returnVal
}

function putTaskStatus(index, data) {
    $.ajax({
        type: 'put',
        url: '/tasks?index=' +index,
        data : data,
        async: false,
        success: function (data) {
            returnVal = data
        },
        dataType: 'json',
        error: function (err) {
        }
    })
}

function doStartOrStop() {
    // worker
    var worker = localStorage.getItem('worker')
    if ($("#main").val() == 'start') {
        //找到未做任务，今天的
        var todayTasks = getData('/tasks?status=todoing&type=' + getQueryVariable('type') + '&date=' + new Date().toLocaleDateString() + '&order=orderNo' )
        //找到worker与本机一致的任务
        if (todayTasks && todayTasks.length > 0) {
            var task = todayTasks[0]
            if (worker) {
                for (var i = 0; i < todayTasks.length; i++) {
                    if (todayTasks[i].worker == worker) {
                        task = todayTasks[i]
                        break
                    }
                }
            }
            //开始执行任务,更新状态
            putTaskStatus(task.index, { status : "doing",worker: worker ,startTime : new Date().toTimeString()})
            //缓存值
            $('#txtIndex').val(task.index)
            $('#txtUser').val(task.user)
            $('#txtPwd').val(task.pwd)

            $('#main').val('stop')
            console.log('task started : ' + JSON.stringify(task))
        }else{
            console.log('cannot find task')
        }
    }
    else{
        var index = $('#txtIndex').val()
        putTaskStatus(index , {status : "done" , endTime : new Date().toTimeString()})
         $('#main').val('start')
         console.log('task stop:' + index)
    }

}


function keyWorker() {
    //console.log($('#txtWorker').val())
    var value = $('#txtWorker').val()
    localStorage.setItem('worker', value)
}