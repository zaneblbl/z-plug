require('./login.css')
// import common from '../../Common/common'
let login = {
  init() {
    // let loginBtn = document.createElement('a')
    // loginBtn.id = 'zPlug__login__btn'
    // loginBtn.classList.add('zPlug__login__btn')
    // loginBtn.innerHTML = `<div>Login</div>`
    // loginBtn.href = `https://zaneblbl.github.io/z-plug/`
    // window.document.body.appendChild(loginBtn);
    this.loginListener()
  },
  toLogin(){
      console.log('---------');

      chrome.extension.sendMessage({
        'url': `https://github.com/login/oauth/access_token?client_id=${e.data.clientID}&client_secret=${e.data.clientSecret}&code=${e.data.code}`,
        'type': 'get'
      }, function (res) {
        console.log(res.data.access_token);
        if (chrome.storage) {
          chrome.storage.sync.set({
            access_token: res.data.access_token,
          }, function () {
            document.write('login success')
          });
        }
      });
    
  },
  loginListener() {
    let xhr = new XMLHttpRequest()
    let clientID = `c92b731ae212fbc66088`
    let clientSecret = `d3f4065441e8ed9d2d6a965af327348c570523ea`
    let url = `https://github.com/login/oauth/authorize?client_id=${clientID}`

    let code = this.getQueryVariable('code')
    if (code) {
      console.log('22222222');
      
      let param={'clientID': clientID,'clientSecret':clientSecret,'code':code}

    } else {
      window.location.href = url
    } 
  },
  getQueryVariable(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] == variable) {
            return pair[1]
        }
    }
    return (false)
}
}

login.init()