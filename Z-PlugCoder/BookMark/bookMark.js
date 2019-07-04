var uploadBtn = document.getElementById('upload_btn');
var downloadBtn = document.getElementById('download_btn');
var saveBtn = document.getElementById('save_btn');

var userName = document.getElementById('username');
var accessToken = document.getElementById('access_token');
var path = document.getElementById('path');
var saveRadios = document.getElementsByName('isSave');
var isSave = 'no';

var showMsg=document.getElementById('show_msg');
read_msg();

/**
 * 保存事件
 */
saveBtn.addEventListener("click", function () {
    isSave = is_save(saveRadios);
    save_msg(isSave);
});
/**
 * 上传事件
 */
uploadBtn.addEventListener("click", function () {
    //获取本地书签列表
    chrome.bookmarks.getTree(function (marklist) {
        //上传到github上
        update_github_marks(userName.value, accessToken.value, path.value,marklist);

    });

});
/**
 * 下载事件
 */
downloadBtn.addEventListener("click", function () {

    let marksobj = null;
    //从github上获取书签json
    get_github_content(userName.value, accessToken.value, path.value).then((data)=>{
        showMsg.innerText=JSON.parse(data).content;

        marksobj=new Base64().decode(JSON.stringify(JSON.parse(data).content));
        // showMsg.innerText=marksobj;
        if (marksobj) {
            // 移除根目录书签,并重新下载新的书签列表
            chrome.bookmarks.getChildren('1',function(marklist){
                showMsg.innerText=JSON.stringify(marklist);
                // 循环删除
                for(let l in marklist){
                }
                // chrome.bookmarks.removeTree('3', function () {
                //     showMsg.innerText='remove';
                //      chrome.bookmarks.create(marksobj);
                // });
            });
           
        }
    },(error)=>{});
   

});

/**
 * 连接github,更新书签
 */
function update_github_marks(userName, access_token, path,marklist) {
    let url = `https://api.github.com/repos/${userName}/${path.substring(0,path.indexOf('/'))}/contents/${path.substring(path.indexOf('/')+1)}?access_token=${access_token}`;
    let params = {};
    get_github_content(userName,access_token,path).then((data)=>{
        params.sha=JSON.parse(data).sha;
        params.message='update bookmark';
        // content内容需转成base64
        params.content=new Base64().encode(JSON.stringify(marklist));
        return new Promise((resolve, reject) => {
            try {
                chrome.extension.sendMessage({
                    'url': url,
                    'type': 'put',
                    'params': params
                }, function (ret) {
                    if (ret) {
                        showMsg.innerText='uplaod success！';
                        resolve(ret);
                    } else {
                        reject();
                    }
                });
            } catch (e) {
                reject(e);
            }
    
        });
    },(error)=>{
        return null;
    });
}
/**
 * 获取操作文件的所有信息
 */
function get_github_content(userName, access_token, path) {
    let url = `https://api.github.com/repos/${userName}/${path.substring(0,path.indexOf('/'))}/contents/${path.substring(path.indexOf('/')+1)}?access_token=${access_token}`;
    return new Promise((resolve, reject) => {
        try {
            chrome.extension.sendMessage({
                'url': url,
                'type': 'get'
            }, function (ret) {
                if (ret) {
                    resolve(ret);
                } else {
                    reject();
                }
            });
        } catch (e) {
            reject();
        }

    });
}

function is_save(radios) {
    for (let r in radios) {
        if (radios[r].checked) {
            return radios[r].value;
        }
    }
}
/**
 * 保存配置数据
 */
function save_msg(isSave) {
    // 保存配置数据
    if (isSave === 'yes') {
        chrome.storage.sync.set({
            userName: userName.value,
            accessToken: accessToken.value,
            path: path.value,
            isSave: isSave
        }, function () {
            showMsg.innerText='save success!';
        });
    } else {
        chrome.storage.sync.set({
            userName: '',
            accessToken: '',
            path: '',
            isSave: isSave
        }, function () {
            showMsg.innerText='save success!';
        });
    }
}

/**
 * 读取配置数据
 */
function read_msg() {
    // 读取数据，第一个参数是指定要读取的key以及设置默认值
    chrome.storage.sync.get({
        userName: '',
        accessToken: '',
        path: '',
        isSave: ''
    }, function (items) {
        userName.value = items.userName;
        accessToken.value = items.accessToken;
        path.value = items.path;
        for (r in saveRadios) {
            if (saveRadios[r].value === items.isSave) {
                saveRadios[r].checked = true;
                isSave = items.isSave;
            }
        }

    });
}

/**
 * 字符串转base64
 */
function Base64() {
    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 
    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }
 
    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }
 
    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
 
        }
        return utftext;
    }
 
    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}