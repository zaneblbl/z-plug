// 输入翻译
require('./inputTranslate.css')
let inputTranslateBox={
  init(){
    this.createDom()
  },
  createDom(){
    let showIcon=document.createElement('i')
    showIcon.classList.add('zPlug__inputTranslate__mainIcon')
  }
}
inputTranslateBox.init()