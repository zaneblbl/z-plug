require('./login.css')
// import common from '../../Common/common'
let login = {
  init() {
    let loginBtn = document.createElement('a')
    loginBtn.id = 'zPlug__login__btn'
    loginBtn.classList.add('zPlug__login__btn')
    loginBtn.innerHTML = `<div>Login</div>`
    loginBtn.href = `https://zaneblbl.github.io/z-plug/`
    window.document.body.appendChild(loginBtn);

    this.loginListener()
  },
  toLogin(e){
      console.log('---------');

      // chrome.extension.sendMessage({
      //   'url': `https://github.com/login/oauth/access_token?client_id=${e.data.clientID}&client_secret=${e.data.clientSecret}&code=${e.data.code}`,
      //   'type': 'get'
      // }, function (res) {
      //   console.log(res.data.access_token);
      //   if (chrome.storage) {
      //     chrome.storage.sync.set({
      //       access_token: res.data.access_token,
      //     }, function () {
      //       document.write('login success')
      //     });
      //   }
      // });
    
  },
  loginListener() {
    window.removeEventListener("message",this.toLogin)
    window.addEventListener("message",this.toLogin, false);
  }
}

login.init()