chrome.extension.onMessage.addListener(function (objRequest, _, sendResponse) {
    var url = objRequest.url;
    translate_ajax(url).then((result) => {
        // 将正确信息返回content_script
        sendResponse(result);
    }).catch((error) => {
        // 将错误信息返回content_script
        sendResponse(error);
    });

     //由于需要异步调用sendResponse，所以需要加上return true，通知sendResponse函数等待调用
    return true;

});

function translate_ajax(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url,true);
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                // alert(xhr.responseText.toString());
                resolve(xhr.responseText);
            }
        
        };
        // xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send();

    });
}