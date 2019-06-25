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
    target.oncontextmenu=function(e){
        e=e || window.e;
        let y=e.clickY;
        let x=e.clickX;

        let ex=x-target.offsetLeft;
        let ey=y-target.offsetTop;

        document.onmousemove=function(mov_e){
            mov_e=mov_e || window.event;
            let movY=e.clickY;
            let movX=e.clickX;

            target.style.left=(movX-ex)+'px';
            target.style.top=(movY-ey)+'px';
        } 
    }

    target.onmouseup=function(){
        document.onmousemove=null;
    }

}
stage();