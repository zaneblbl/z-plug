import getJson from './201201.json'
import CreactEl from '../../../Common/virtualDom'
let loveGirl = {
  boneJson: {},
  init() {
    this.initJSON()
  },
  createBonesDom(bones) {
    // 使用虚拟dom创建节点
    let createEl = (tagName, props, children) => new CreactEl(tagName, props, children)
    // const vdom = createEl('div', {
    //   'id': 'box'
    // }, [
    //   createEl('h1', {
    //     style: 'color: pink'
    //   }, ['I am H1']),
    //   createEl('ul', {
    //     class: 'list'
    //   }, [createEl('li', ['#list1']), createEl('li', ['#list2'])]),
    //   createEl('p', ['I am p'])
    // ])
    let vdom=``
    let result=this.childrenDom(bones,bones.filter(res=>res.name=='root')[0])
    vdom=createEl('div',{'id':'root'},result)
    let rootnode = vdom.render()
    document.body.appendChild(rootnode)
  },
  childrenDom(bones,root){
    let children=[]
    bones.forEach(bone => {
      if(bone.parent==root.name){
        bone.children=this.childrenDom(bones,bone)
        // new CreactEl('div', {'id':bone.name}, children)
        children.push(bone)
      }
    });

    return children
  },
  initJSON() {
    this.boneJson = getJson
    console.log(this.boneJson);
    let bones = this.boneJson.bones
    this.createBonesDom(bones)

  }
}

loveGirl.init()