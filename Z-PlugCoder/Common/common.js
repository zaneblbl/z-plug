let common = {
    //移动
    stage_move(target) {
        var box = target; //获取元素
        var x, y; //存储div的坐标
        var isDrop = false; //移动状态的判断鼠标按下才能移动
        box.onmousedown = function (e) {
            var e = e || window.event; //要用event这个对象来获取鼠标的位置
            x = e.clientX - box.offsetLeft;
            y = e.clientY - box.offsetTop;
            isDrop = true; //设为true表示可以移动
        }
        document.onmousemove = function (e) {
            //是否为可移动状态                　　　　　　　　　　　 　　　　　　　
            if (isDrop) {
                var e = e || window.event;
                var moveX = e.clientX - x; //得到距离左边距离                    　　
                var moveY = e.clientY - y; //得到距离上边距离

                var maxX = document.documentElement.clientWidth - box.offsetWidth;
                var maxY = document.documentElement.clientHeight - box.offsetHeight;
                //范围限定  当移动的距离最小时取最大  移动的距离最大时取最小
                //范围限定一
                /*if(moveX < 0) {
                    moveX = 0
                } else if(moveX > maxX) {
                    moveX = maxX;
                }

                if(moveY < 0) {
                    moveY = 0;
                } else if(moveY > maxY) {
                    moveY = maxY;
                }　*/
                //范围限定二　
                moveX = Math.min(maxX, Math.max(0, moveX));

                moveY = Math.min(maxY, Math.max(0, moveY));
                box.style.left = moveX + "px";
                box.style.top = moveY + "px";
            } else {
                return;
            }
        }
        document.onmouseup = function () {
            isDrop = false; //设置为false不可移动
        }
    },
    getQueryVariable(variable) {
        var query = window.location.search.substring(1)
        var vars = query.split('&')
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=')
            if (pair[0] == variable) {
                return pair[1]
            }
        }
        return (false)
    },
    ajax(type, url, params) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.status === 200 && xhr.readyState === 4) {
                    // alert(xhr.responseText.toString());
                    resolve(xhr.responseText);
                }
            };
            if (type.toLowerCase() === 'get') {
                xhr.open('get', url, true);
                // xhr.setRequestHeader('Content-type', 'application/json');
                xhr.send();
            } else if (type.toLowerCase() === 'post') {
                xhr.open('post', url, true);
                // xhr.setRequestHeader('Content-type', 'application/json');
                xhr.send(params);
            } else if (type.toLowerCase() === 'put') {
                xhr.open('put', url, true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send(JSON.stringify(params));
            } else {
                console.log('不支持的请求格式');
            }
        });
    }
}

export default common