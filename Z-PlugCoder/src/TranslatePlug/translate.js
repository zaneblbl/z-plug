require('./translate.css')
document.addEventListener('mouseup', function (e) {
    //获取鼠标的位置
    e = e || window.event;
    get_txt(e);
});
//获取鼠标选中的文字
function get_txt(e) {
    var txt = window.getSelection ? window.getSelection() : document.selection.createRange().text;
    var txtTranslate = txt.toString();
    if (txtTranslate != "") {
        create_translate_box(txtTranslate, e.clientX, e.clientY);
    }
}

//创建容器
function create_translate_box(txt, x, y) {
    if (txt != '' || txt != undefined || txt != null) {
        //获取处理后的内容
        link_translate('auto', 'zh', txt).then((result) => {
            var box = document.getElementById('plug_translatebox');
            if (box == null || box == undefined) {
                var box = document.createElement('div');
                box.id = 'plug_translatebox';
                box.classList.add('plug_translateboxclass');
                box.innerHTML = result.toString();
                document.body.appendChild(box);
                //显示重新定位
                box.style.top = (y + box.offsetHeight) + 'px';
                box.style.left = (x - box.offsetWidth / 2) + 'px';
            }
        }, (error) => {
            console.log(error);
        }).catch(function (error) {
            console.log('错误：' + error);

        });
    }
}

function link_translate(from, to, txt) {
    var result = '';
    return new Promise((resolve, reject) => {
        //通知后台background.js发送跨域请求
        chrome.extension.sendMessage({
            'url': links('youdao', txt),
            'type':'get'
        }, function (ret) {
            if (ret != null || ret != undefined) {
                var jsonret = JSON.parse(ret);
                var src = jsonret.translateResult[0][0].src;
                var tgt = jsonret.translateResult[0][0].tgt;
                resolve(tgt);
            } else reject('error');
        });
    });
}
//删除box
var remove_box = function () {
    var box = document.getElementById('plug_translatebox');
    if (box) {
        document.body.removeChild(box);
    }
}
//进行节流
var throttle = function (fn, delay, atleast) {
    var timer = null;
    var previous = null;
    return function () {
        var now = +new Date();
        if (!previous) previous = now;
        if (now - previous > atleast) {
            fn();
            // 重置上一次开始时间为本次结束时间
            previous = now;
        } else {
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn();
            }, delay);
        }
    }
};

//通过闭包进行节流
var thro = throttle(remove_box, 40);
window.onscroll = function () {
    thro();
}
document.addEventListener('click', function (e) {
    remove_box();
});

//多方翻译连接选择
function links(which, txt) {
    var bing = `http://api.microsofttranslator.com/v2/Http.svc/Translate?appId=AFC76A66CF4F434ED080D245C30CF1E71C22959C&from=zh&to=en&text=${txt}`;
    var google = `http://translate.google.cn/translate_a/single?client=gtx&dt=t&dj=1&ie=UTF-8&sl=auto&tl=zh_TW&q=${txt}`;
    var baidu = `http://fanyi.baidu.com/transapi?from=auto&to=cht&query=${txt}`;
    var youdao = `http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=${txt}`;
    return youdao;
}