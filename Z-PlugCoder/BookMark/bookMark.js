var uploadBtn = document.getElementById('upload_btn');
var downloadBtn = document.getElementById('download_btn');
var saveBtn = document.getElementById('save_btn');

var userName = document.getElementById('username');
var accessToken = document.getElementById('access_token');
var path = document.getElementById('path');
var saveRadios = document.getElementsByName('isSave');
var isSave = 'no';

var showMsg = document.getElementById('show_msg');
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
        update_github_marks(userName.value, accessToken.value, path.value, marklist);
    });
});
/**
 * 下载事件
 */
downloadBtn.addEventListener("click", function () {
    let marksobj = null;
    //从github上获取书签json
    get_github_content(userName.value, accessToken.value, path.value).then((data) => {
        marksobj = Base64.decode(JSON.parse(data).content.toString());
        if (marksobj) {
            // 移除根目录书签,并重新下载新的书签列表
            // var remove = function (id) {
            //     chrome.bookmarks.getChildren(id, function (marklist) {
            //         // 循环删除除id为1,2的书签列表
            //         for (let l in marklist) {
            //             if (marklist[l].id === '1' || marklist[l].id === '2') {
            //                 remove(marklist[l].id);
            //             } else {
            //                 chrome.bookmarks.removeTree(marklist[l].id, function () {});
            //             }
            //         }
            //     });

            // }
            //循环添加
            var createlist = function (marklist, parentId) {
                for (let m in marklist) {
                    //父节点
                    marklist[m].parentId = parentId;
                    //id=1和id=2为固定不可更改书签
                    if (marklist[m].id === '1' || marklist[m].id === '2') {
                        createlist(marklist[m].children, marklist[m].id);
                    } else {
                        //删除不必要的，书签id等会自动添加
                        if (marklist[m].dateAdded) delete marklist[m].dateAdded;
                        if (marklist[m].id) delete marklist[m].id;
                        if (marklist[m].dateGroupModified) delete marklist[m].dateGroupModified;
                        //存在文件夹时，递归调用
                        if (marklist[m].children) {
                            let children = marklist[m].children;
                            delete marklist[m].children;
                            chrome.bookmarks.create(marklist[m], function (msg) {
                                createlist(children, msg.id)
                            });
                        } else {
                            chrome.bookmarks.create(marklist[m]);

                        }
                    }
                }
            }
            // 获取根书签(id=0)的书签栏(id=1)列表（其他书签id=2）
            let marklist = JSON.parse(marksobj).find(function (x) {
                return x.id === '0'
            }).children;
            createlist(marklist, '0');
            showMsg.innerText = 'DownLoad Success!';

        }
    }, (error) => {});
});


/**
 * 连接github,更新书签
 */
function update_github_marks(userName, access_token, path, marklist) {
    let url = `https://api.github.com/repos/${userName}/${path.substring(0,path.indexOf('/'))}/contents/${path.substring(path.indexOf('/')+1)}?access_token=${access_token}`;
    let params = {};
    get_github_content(userName, access_token, path).then((data) => {
        params.sha = JSON.parse(data).sha;
        params.message = 'update bookmark';
        // content内容需转成base64
        params.content = Base64.encode(JSON.stringify(marklist));
        return new Promise((resolve, reject) => {
            try {
                chrome.extension.sendMessage({
                    'url': url,
                    'type': 'put',
                    'params': params
                }, function (ret) {
                    if (ret) {
                        showMsg.innerText = 'uplaod success！';
                        resolve(ret);
                    } else {
                        reject('undefined');
                    }
                });
            } catch (e) {
                reject(e);
            }

        });
    }, (error) => {
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
                    reject('get content undefined');
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
            showMsg.innerText = 'save success!';
        });
    } else {
        chrome.storage.sync.set({
            userName: '',
            accessToken: '',
            path: '',
            isSave: isSave
        }, function () {
            showMsg.innerText = 'save success!';
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
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    decode: function (e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    },
    _utf8_encode: function (e) {
        e = e.replace(/rn/g, "n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    },
    _utf8_decode: function (e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
}