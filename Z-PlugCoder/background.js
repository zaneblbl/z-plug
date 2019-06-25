chrome.extension.onMessage.addListener(function (objRequest, _, sendResponse) {
    var url = objRequest.url || '';
    var type = objRequest.type || 'get';
    var params = objRequest.params || {};
    background_ajax(type,url,params).then((result) => {
        // 将正确信息返回content_script
        sendResponse(result);
    }).catch((error) => {
        // 将错误信息返回content_script
        sendResponse(error);
    });

     //由于需要异步调用sendResponse，所以需要加上return true，通知sendResponse函数等待调用
    return true;

});

function background_ajax(type,url,params) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                // alert(xhr.responseText.toString());
                resolve(xhr.responseText);
            }
        };
        if(type.toLowerCase()==='get'){
            xhr.open('get', url,true);
            // xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send();
        }
        else if (type.toLowerCase()==='post'){
            xhr.open('post', url,true);
            // xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(params);
        }else{
            console.log('不支持的请求格式');
            
        }


    });
}

