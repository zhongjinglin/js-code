function compose(...fns) {
  const length = fns.length
  for (let i = 0; i < length; i++) {
    if (typeof fns[i] !== 'function') {
      throw new TypeError(`[${fns[i]}] is not a function`)
    }
  }
  return function (...args) {
    let index = 0
    let result = length ? fns[index].apply(this, args) : undefined
    while (++index < length) {
      result = fns[index].call(this, result)
    }
    return result
  }
}
