!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="build/",n(n.s=14)}({14:function(e,t,n){n(15),e.exports=n(16)},15:function(e,t){var n=document.getElementById("upload_btn"),o=document.getElementById("download_btn"),c=(document.getElementById("save_btn"),document.getElementById("username")),i=document.getElementById("access_token"),a=document.getElementById("path"),d=document.getElementsByName("isSave"),s=document.getElementById("show_msg");function _(e,t,n){let o=`https://api.github.com/repos/${e}/${n.substring(0,n.indexOf("/"))}/contents/${n.substring(n.indexOf("/")+1)}?access_token=${t}`;return new Promise((e,t)=>{try{chrome.extension.sendMessage({url:o,type:"get"},(function(n){n?e(n):t("get content undefined")}))}catch(e){t()}})}chrome.storage&&chrome.storage.sync.get({userName:"",accessToken:"",path:"",isSave:""},(function(e){for(r in c.value=e.userName,i.value=e.accessToken,a.value=e.path,d)d[r].value===e.isSave&&(d[r].checked=!0,e.isSave)})),n.addEventListener("click",(function(){chrome.bookmarks.getTree((function(e){!function(e,t,n,o){let r=`https://api.github.com/repos/${e}/${n.substring(0,n.indexOf("/"))}/contents/${n.substring(n.indexOf("/")+1)}?access_token=${t}`,c={};_(e,t,n).then(e=>(c.sha=JSON.parse(e).sha,c.message="update bookmark",c.content=u.encode(JSON.stringify(o)),new Promise((e,t)=>{try{chrome.extension.sendMessage({url:r,type:"put",params:c},(function(n){n?(s.innerText="uplaod success！",e(n)):t("undefined")}))}catch(e){t(e)}})),e=>null)}(c.value,i.value,a.value,e)}))})),o.addEventListener("click",(function(){let e=null;_(c.value,i.value,a.value).then(t=>{if(e=u.decode(JSON.parse(t).content.toString()),e){let t=JSON.parse(e).find((function(e){return"0"===e.id})).children;!function e(t){chrome.bookmarks.getChildren(t,(function(t){for(let n in t)"1"===t[n].id||"2"===t[n].id?e(t[n].id):chrome.bookmarks.removeTree(t[n].id,(function(){}))}))}("0"),setTimeout(()=>{!function e(t,n){for(let o in t)if(t[o].parentId=n,"1"===t[o].id||"2"===t[o].id)e(t[o].children,t[o].id);else if(t[o].dateAdded&&delete t[o].dateAdded,t[o].id&&delete t[o].id,t[o].dateGroupModified&&delete t[o].dateGroupModified,t[o].children){let n=t[o].children;delete t[o].children,chrome.bookmarks.create(t[o],(function(t){e(n,t.id)}))}else chrome.bookmarks.create(t[o])}(t,"0")},0),s.innerText="DownLoad Success!"}},e=>{})}));var u={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t,n,o,r,c,i,a,d="",s=0;for(e=u._utf8_encode(e);s<e.length;)r=(t=e.charCodeAt(s++))>>2,c=(3&t)<<4|(n=e.charCodeAt(s++))>>4,i=(15&n)<<2|(o=e.charCodeAt(s++))>>6,a=63&o,isNaN(n)?i=a=64:isNaN(o)&&(a=64),d=d+this._keyStr.charAt(r)+this._keyStr.charAt(c)+this._keyStr.charAt(i)+this._keyStr.charAt(a);return d},decode:function(e){var t,n,o,r,c,i,a="",d=0;for(e=e.replace(/[^A-Za-z0-9+/=]/g,"");d<e.length;)t=this._keyStr.indexOf(e.charAt(d++))<<2|(r=this._keyStr.indexOf(e.charAt(d++)))>>4,n=(15&r)<<4|(c=this._keyStr.indexOf(e.charAt(d++)))>>2,o=(3&c)<<6|(i=this._keyStr.indexOf(e.charAt(d++))),a+=String.fromCharCode(t),64!=c&&(a+=String.fromCharCode(n)),64!=i&&(a+=String.fromCharCode(o));return a=u._utf8_decode(a)},_utf8_encode:function(e){e=e.replace(/rn/g,"n");for(var t="",n=0;n<e.length;n++){var o=e.charCodeAt(n);o<128?t+=String.fromCharCode(o):o>127&&o<2048?(t+=String.fromCharCode(o>>6|192),t+=String.fromCharCode(63&o|128)):(t+=String.fromCharCode(o>>12|224),t+=String.fromCharCode(o>>6&63|128),t+=String.fromCharCode(63&o|128))}return t},_utf8_decode:function(e){for(var t="",n=0,o=c1=c2=0;n<e.length;)(o=e.charCodeAt(n))<128?(t+=String.fromCharCode(o),n++):o>191&&o<224?(c2=e.charCodeAt(n+1),t+=String.fromCharCode((31&o)<<6|63&c2),n+=2):(c2=e.charCodeAt(n+1),c3=e.charCodeAt(n+2),t+=String.fromCharCode((15&o)<<12|(63&c2)<<6|63&c3),n+=3);return t}}},16:function(e,t){({windowConfigSave:"",config__window__backImg:"",config__window__showMsg:"",config__window__foreColor:"",config__clientID:"",config__clientSecret:"",username:"",access_token:"",path:"",init(){this.getDom(),this.getStorage(),this.setStorage()},getDom(){this.windowConfigSave=document.getElementById("config__saveBtn"),this.config__window__backImg=document.getElementById("config__window__backImg"),this.config__window__showMsg=document.getElementById("config__window__showMsg"),this.config__window__foreColor=document.getElementById("config__window__foreColor"),this.config__clientID=document.getElementById("config__clientID"),this.config__clientSecret=document.getElementById("config__clientSecret"),this.access_token=document.getElementById("access_token"),this.username=document.getElementById("username"),this.path=document.getElementById("path")},getStorage(){let e=this;chrome.storage&&chrome.storage.sync.get({config__window__backImg:"",config__window__foreColor:"",config__clientID:"",config__clientSecret:"",access_token:"",username:"",path:""},(function(t){e.config__window__backImg.value=t.config__window__backImg,e.config__window__foreColor.value=t.config__window__foreColor,e.access_token.value=t.access_token,e.config__clientID.value=t.config__clientID,e.config__clientSecret.value=t.config__clientSecret,e.username.value=t.username,e.path.value=t.path}))},setStorage(){let e=this;e.windowConfigSave.addEventListener("click",(function(){console.log(e.config__clientSecret.value),chrome.storage&&chrome.storage.sync.set({config__window__backImg:e.config__window__backImg.value,config__window__foreColor:e.config__window__foreColor.value,config__clientID:e.config__clientID.value,config__clientSecret:e.config__clientSecret.value,username:e.username.value,access_token:e.access_token.value,path:e.path.value},(function(){e.config__window__showMsg.innerText="save success!"}))}))}}).init()}});