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
    
}
stage();