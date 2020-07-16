require('./login.css')
// import common from '../../Common/common'
let login={
  init(){
    let loginBtn=document.createElement('a')
    loginBtn.id='zPlug__login__btn'
    loginBtn.classList.add('zPlug__login__btn')
    loginBtn.innerHTML=`<div>Login</div>`
    loginBtn.href=`https://zaneblbl.github.io/z-plug/`
    window.document.body.appendChild(loginBtn);

  }
}

login.init()