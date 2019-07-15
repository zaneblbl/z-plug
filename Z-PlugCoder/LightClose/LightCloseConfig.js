
var colorpick = document.getElementById('colorpick');
var showMsg = document.getElementById('show_msg');

colorpick.onchange=function(){
    setColor(colorpick.value);
}

var setColor=function(color){

    chrome.storage.sync.set({
        color:color
    },function(){
        showMsg.innerText = 'success!';
    });

}

