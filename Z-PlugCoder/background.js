/**
 * ajax 请求
 */
chrome.extension.onMessage.addListener(function (objRequest, _, sendResponse) {
    var url = objRequest.url || '';
    var type = objRequest.type || 'get';
    var params = objRequest.params || {};
    var access_token=objRequest.access_token || '';
    background_ajax(type, url, params,access_token).then((result) => {
        // 将正确信息返回content_script
        sendResponse(result);
    }).catch((error) => {
        // 将错误信息返回content_script
        sendResponse(error);
    });
    //由于需要异步调用sendResponse，所以需要加上return true，通知sendResponse函数等待调用
    return true;
});

function background_ajax(type, url, params,access_token) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
        };
        if (type.toLowerCase() === 'get') {
            xhr.open('get', url, true);
            if(access_token){
                xhr.setRequestHeader('Authorization', "token "+access_token);
            }
            xhr.send();
        } else if (type.toLowerCase() === 'post') {
            xhr.open('post', url, true);
            if(access_token){
                xhr.setRequestHeader('Authorization', "token "+access_token);
            }
            // xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(params);
        } else if (type.toLowerCase() === 'put') {
            xhr.open('put', url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            if(access_token){
                xhr.setRequestHeader('Authorization', "token "+access_token);
            }
            xhr.send(JSON.stringify(params));
        } else {
            console.log('不支持的请求格式');
        }
    });
}

/**
 * 选中文字后使用百度搜索
 */
chrome.contextMenus.create({
    title: '使用度娘搜索：%s', // %s表示选中的文字
    contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
    onclick: function (params) {
        // 注意不能使用location.href，因为location是属于background的window对象
        chrome.tabs.create({
            url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)
        });
    }
});
