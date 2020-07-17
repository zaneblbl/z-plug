// require('./mainStage.css')
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
    console.log(this.isOpen);
    
  }
}

main.init()