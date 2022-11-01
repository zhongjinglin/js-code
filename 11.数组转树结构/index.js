// 方式一：递归
function arrToTree(list, root) {
  const arr = []
  list.forEach((item) => {
    if (item.parent_id === root) {
      const children = arrToTree(list, item.id)
      if (children.length > 0) {
        item.children = children
      }
      arr.push(item)
    }
  })
  return arr
}