require('./mainStage.css')
import login from '../Login/login.js'
import window from '../WindowPlug/window.js'
const main={
  isOpen:false,
  init(){
    this.createDom()
    
  },
  createDom(){
    let shrinkIcon=document.createElement('div')
    shrinkIcon.classList.add('zPlug__main')
    shrinkIcon.addEventListener('click',this.open)
    document.body.appendChild(shrinkIcon)
  },
  open(){
    this.isOpen=!this.isOpen
    if(this.isOpen){
      login.init()
      window.init()
    }else{
      window.clear()
      login.clear()
    }
  }
}

main.init()