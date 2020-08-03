/* 
*   用法：
*/
// let vdom = ``
// vdom = createEl('div', {
//   'id': 'root',
//   class: 'zPlug__coverBackPic',
//   style: `position:relative;width:${this.width}px;height:${this.height}px;`
// }, [createEl()...])
// let rootnode = vdom.render()
// document.body.appendChild(rootnode)
// 创建dom
export default class CreateEl {
  constructor (tagName, props, children) {
    // 当只有两个参数的时候 例如 celement(el, [123])
    if (Array.isArray(props)) {
      children = props
      props = {}
    }
    // tagName, props, children数据保存到this对象上
    this.tagName = tagName
    this.props = props || {}
    this.children = children || []
    this.key = props ? props.key : undefined

    let count = 0
    this.children.forEach(child => {
      if (child instanceof CreateEl) {
        count += child.count
      } else {
        child = '' + child
      }
      count++
    })
    // 给每一个节点设置一个count
    this.count = count
  }
  // 构建一个 dom 树
  render () {
    // 创建dom
    const el = document.createElement(this.tagName)
    const props = this.props
    // 循环所有属性，然后设置属性
    for (let [key, val] of Object.entries(props)) {
      el.setAttribute(key,val)
      // setAttr(el, key, val)
    }
    this.children.forEach(child => {
      // 递归循环 构建tree
      let childEl = (child instanceof CreateEl) ? child.render() : document.createTextNode(child)
      el.appendChild(childEl)
    })
    return el
  }
}
