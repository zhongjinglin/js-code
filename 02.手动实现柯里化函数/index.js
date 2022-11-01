function currying(fn) {
  function newFn(...args1) {
    if (args1.length >= fn.length) {
      return fn.apply(this, args1)
    } else {
      return function (...args2) {
        return newFn.apply(this, args1.concat(args2))
      }
    }
  }
  return newFn
}
