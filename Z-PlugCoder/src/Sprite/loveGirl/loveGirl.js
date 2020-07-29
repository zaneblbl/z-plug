import getJson from './201201.json'
import CreactEl from '../../../Common/virtualDom'
require('./loveGirl.css')
let loveGirl = {
  boneJson: {},
  width: '',
  height: '',
  picPath:'./201201.png',
  init() {
    this.initBoneJSON()
  },
  createBonesDom(bones) {
    // 使用虚拟dom创建节点
    let createEl = (tagName, props, children) => new CreactEl(tagName, props, children)
    let vdom = ``
    let result = this.childrenDom(bones, bones.filter(res => res.name == 'root')[0])
    console.log(result);
    
    vdom = createEl('div', {
      'id': 'root',
      class: 'zPlug__coverBackPic',
      style: `position:relative;width:${this.width}px;height:${this.height}px;`
    }, result)
    let rootnode = vdom.render()
    document.body.appendChild(rootnode)
  },
  // 父子分组
  childrenDom(bones, root) {
    let children = []
    bones.forEach(bone => {
      if (bone.parent == root.name) {
        let style = `position:absolute;left:${bone.x}px;top:${bone.y}px;transform:rotate(${bone.rotation}deg);height:${bone.length}px;width:${bone.length}px;`
        let creatEl = new CreactEl('div', {
          id: bone.name,
          style: style
        }, this.childrenDom(bones, bone))
        children.push(creatEl)
      }
    });
    return children
  },
  // 初始化bone json
  initBoneJSON() {
    this.boneJson = getJson
    this.width = this.boneJson.skeleton.width
    this.height = this.boneJson.skeleton.height
    console.log(this.boneJson);
    let bones = this.boneJson.bones
    this.createBonesDom(bones)
  }
}

loveGirl.init()