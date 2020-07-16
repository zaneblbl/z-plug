// 配置信息
let z_config = {
  windowConfigSave: '',
  config__window__backImg: '',
  config__window__showMsg: '',
  config__window__foreColor: '',
  access_token:'',
  init() {
    this.getDom()
    this.getStorage()
    this.setStorage()
  },
  getDom() {
    this.windowConfigSave = document.getElementById('config__window__saveBtn')
    this.config__window__backImg = document.getElementById('config__window__backImg')
    this.config__window__showMsg = document.getElementById('config__window__showMsg')
    this.config__window__foreColor = document.getElementById('config__window__foreColor')
    this.access_token = document.getElementById('access_token')
  },
  // 获取存储的信息
  getStorage() {
    let self = this
    if (chrome.storage) {
      chrome.storage.sync.get({
        config__window__backImg: '',
        config__window__foreColor: '',
        access_token:''
      }, function (items) {
        self.config__window__backImg.value = items.config__window__backImg;
        self.config__window__foreColor.value = items.config__window__foreColor;
        self.access_token.value=items.access_token
      });
    }
  },
  // 保存存储信息
  setStorage() {
    let self = this
    self.windowConfigSave.addEventListener('click', function () {
      if (chrome.storage) {
        chrome.storage.sync.set({
          config__window__backImg: self.config__window__backImg.value,
          config__window__foreColor: self.config__window__foreColor.value
        }, function () {
          self.config__window__showMsg.innerText = 'save success!';
        });
      }
    })
  }
}

z_config.init()