var div;

function stage(){
    //stage
    var stage=`<canvas id='plug_earth_stage'></canvas>`;
    div=document.createElement('div');
    div.innerHTML=stage;
    div.id='plug_main';
    div.classList.add('plug_main');
    window.document.body.appendChild(div);

    //canvas stage宽高设置
    var canvas=document.getElementById('plug_earth_stage');
    canvas.width=div.offsetWidth;
    canvas.height=div.offsetHeight;
    
    stage_move(canvas);
}

function stage_move(target){
    var box = target; //获取元素
            var x, y; //存储div的坐标
            var isDrop = false; //移动状态的判断鼠标按下才能移动
            box.onmousedown = function(e) {
                var e = e || window.event; //要用event这个对象来获取鼠标的位置
                x = e.clientX - box.offsetLeft;
                y = e.clientY - box.offsetTop;
                isDrop = true; //设为true表示可以移动
            }

            document.onmousemove = function(e) {
                //是否为可移动状态                　　　　　　　　　　　 　　　　　　　
                if(isDrop) {　　　　
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
                    moveX=Math.min(maxX, Math.max(0,moveX));
                    
                    moveY=Math.min(maxY, Math.max(0,moveY));
                    box.style.left = moveX + "px";　　
                    box.style.top = moveY + "px";　　　　　　　　　　
                } else {
                    return;　　　　　　　　　　
                }

            }

            document.onmouseup = function() {
                isDrop = false; //设置为false不可移动
            }

}
stage();