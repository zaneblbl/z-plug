require('./login.css')
import common from '../../Common/common'
let login = {
  clientID: '',
  clientSecret: '',
  init() {
    let self=this
    if (chrome.storage) {
      chrome.storage.sync.get({
        config__clientID: '',
        config__clientSecret: ''
      }, function (items) {
        self.config__clientID = items.config__clientID;
        self.config__clientSecret = items.config__clientSecret;
      });
    }

    if (window.location.href.indexOf(`https://zaneblbl.github.io/z-plug`) != -1) {
      this.loginListener()
    } else {
      let loginBtn = document.createElement('a')
      loginBtn.id = 'zPlug__login__btn'
      loginBtn.classList.add('zPlug__login__btn')
      loginBtn.innerHTML = `<div>Login</div>`
      loginBtn.href = `https://zaneblbl.github.io/z-plug/`
      window.document.body.appendChild(loginBtn);
    }

  },
  toLogin(param) {
    let self = this
    chrome.extension.sendMessage({
      'url': `https://github.com/login/oauth/access_token?client_id=${param.clientID}&client_secret=${param.clientSecret}&code=${param.code}`,
      'type': 'get'
    }, function (res) {
      let token = self.getToken(res, 'access_token')
      if (chrome.storage) {
        chrome.storage.sync.set({
          access_token: token,
        }, function () {
          document.write('login success')
        });
      }
    });

  },
  loginListener() {
    let clientID = this.clientID
    let clientSecret = this.clientSecret
    let url = `https://github.com/login/oauth/authorize?client_id=${clientID}`
    let code = common.getQueryVariable('code')
    if (code) {
      let param = {
        'clientID': clientID,
        'clientSecret': clientSecret,
        'code': code
      }
      this.toLogin(param)
    } else {
      window.location.href = url
    }
  },
  getToken(string, variable) {
    var query = string
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      if (pair[0] == variable) {
        return pair[1]
      }
    }
    return (false)
  },
}

login.init()