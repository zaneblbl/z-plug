// 配置信息
let z_config = {
  windowConfigSave: '',
  config__window__backImg: '',
  config__window__showMsg: '',
  config__window__foreColor: '',
  config__clientID:'',
  config__clientSecret:'',
  username:'',
  access_token:'',
  path:'',
  init() {
    this.getDom()
    this.getStorage()
    this.setStorage()
  },
  getDom() {
    this.windowConfigSave = document.getElementById('config__saveBtn')
    this.config__window__backImg = document.getElementById('config__window__backImg')
    this.config__window__showMsg = document.getElementById('config__window__showMsg')
    this.config__window__foreColor = document.getElementById('config__window__foreColor')
    this.config__clientID=document.getElementById('config__clientID')
    this.config__clientSecret=document.getElementById('config__clientSecret')
    this.access_token = document.getElementById('access_token')
    this.username=document.getElementById('username')
    this.path=document.getElementById('path')
  },
  // 获取存储的信息
  getStorage() {
    let self = this
    if (chrome.storage) {
      chrome.storage.sync.get({
        config__window__backImg: '',
        config__window__foreColor: '',
        config__clientID:'',
        config__clientSecret:'',
        access_token:'',
        username:'',
        path:''
      }, function (items) {
        self.config__window__backImg.value = items.config__window__backImg;
        self.config__window__foreColor.value = items.config__window__foreColor;
        self.access_token.value=items.access_token;
        self.config__clientID.value=items.config__clientID;
        self.config__clientSecret.value=items.config__clientSecret;
        self.username.value=items.username;
        self.path.value=items.path
      });
    }
  },
  // 保存存储信息
  setStorage() {
    let self = this
    self.windowConfigSave.addEventListener('click', function () {
      console.log(self.config__clientSecret.value);
      
      if (chrome.storage) {
        chrome.storage.sync.set({
          config__window__backImg: self.config__window__backImg.value,
          config__window__foreColor: self.config__window__foreColor.value,
          config__clientID:self.config__clientID.value,
          config__clientSecret:self.config__clientSecret.value,
          username:self.username.value,
          access_token:self.access_token.value,
          path:self.path.value
        }, function () {
          self.config__window__showMsg.innerText = 'save success!';
        });
      }
    })
  }
}

z_config.init()