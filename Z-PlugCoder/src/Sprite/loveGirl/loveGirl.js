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
    let vdom=``
    let result=this.childrenDom(bones,bones.filter(res=>res.name=='root')[0])
    vdom=createEl('div',{'id':'root'},result)
    let rootnode = vdom.render()
    document.body.appendChild(rootnode)
  },
  // 父子分组
  childrenDom(bones,root){
    let children=[]
    bones.forEach(bone => {
      if(bone.parent==root.name){
        let creatEl=new CreactEl('div',{id:bone.name},this.childrenDom(bones,bone))
        children.push(creatEl)
      }
    });
    return children
  },
  // 初始化json
  initJSON() {
    this.boneJson = getJson
    console.log(this.boneJson);
    let bones = this.boneJson.bones
    this.createBonesDom(bones)
  }
}

loveGirl.init()