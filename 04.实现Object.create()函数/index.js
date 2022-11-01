// 方式一：借助Object.setPrototypeOf()设置对象的隐式原型
function createObj(o) {
  var obj = {}
  Object.setPrototypeOf(obj, o)
  return obj
}

// 方式二：借助构造函数
function createObjByConstructor(o) {
  function Fn() {}
  Fn.prototype = o
  return new Fn()
}
