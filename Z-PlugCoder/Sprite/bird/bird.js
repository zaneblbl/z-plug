require('./bird.css')

let z_bird = {
  init() {
    this.creatDom()
  },
  creatDom() {
    let dom = `<div class="bird_contain">
      <div class="bird"></div>
    </div>
    <div class="bird_contain bird_contain_delay1">
      <div class="bird"></div>
    </div>
    <div class="bird_contain bird_contain_delay2">
      <div class="bird"></div>
    </div>`
    let domObj=document.createElement('div');
    domObj.id='z_bird'
    domObj.innerHTML=dom
    document.body.appendChild(domObj)
  }
}

z_bird.init()