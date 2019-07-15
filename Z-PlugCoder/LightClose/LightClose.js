let color='rgba(0,0,0,0.1)';

window.onload=function(){
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

    //此div始终不响应点击事件，避免蒙层遮挡无法响应任何点击事件
    mask.style.pointerEvents='none';
    return mask;
}
