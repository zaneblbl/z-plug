window.onload=function(){
    let color='rgba(0,0,0,0.15)';
    let mask = create_mask(color);
    window.document.body.appendChild(mask);
}
function create_mask(color){
    var mask=document.createElement('div');
    mask.style.width='100%';
    mask.style.height='100%';
    mask.style.backgroundColor=color;
    mask.style.position='fixed';
    mask.style.zIndex='999';
    mask.style.top='0';
    mask.style.left='0';
    //此div始终不响应点击事件
    mask.style.pointerEvents='none';
    return mask;
}
