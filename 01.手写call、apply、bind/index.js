Function.prototype._call = function (thisArg, ...args) {
  const fn = this
  thisArg = thisArg === null || thisArg === undefined ? window : Object(thisArg)
  thisArg.fn = fn
  return thisArg.fn(...args)
}

Function.prototype._apply = function (thisArg, argArray = []) {
  const fn = this
  thisArg = thisArg === null || thisArg === undefined ? window : Object(thisArg)
  thisArg.fn = fn
  return thisArg.fn(...argArray)
}

Function.prototype._bind = function (thisArg, ...args) {
  const fn = this
  const tempFn = Symbol()
  thisArg = thisArg === null || thisArg === undefined ? window : Object(thisArg)
  function newFn(...params) {
    if (this.__proto__.constructor === newFn) {
      this[tempFn] = fn
      this[tempFn](...params)
      delete this[tempFn]
    } else {
      thisArg[tempFn] = fn
      thisArg[tempFn](...args.concat(params))
      delete thisArg[tempFn]
    }
  }
  return newFn
}
