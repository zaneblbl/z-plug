let windowConfigSave=document.getElementById('config__window__saveBtn')

chrome.storage.sync.set({
  userName: userName.value,
  accessToken: accessToken.value,
  path: path.value,
  isSave: isSave
}, function () {
  showMsg.innerText = 'save success!';
});