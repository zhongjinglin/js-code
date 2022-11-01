function deepClone(originValue) {
  const map = new WeakMap()
  return (function _deepClone(originValue) {
    // 如果不是对象，或者是null，直接返回
    if (typeof originValue !== 'object' || originValue === null) {
      return originValue
    }
    // 处理日期
    if (originValue instanceof Date) {
      return new Date(originValue.getTime())
    }
    // 处理正则
    if (originValue instanceof RegExp) {
      return new RegExp(originValue.source)
    }
    // 处理value为Symbol类型
    if (typeof originValue === 'symbol') {
      return Symbol(originValue.description)
    }
    // 处理Set，简单处理
    if (originValue instanceof Set) {
      return new Set([...originValue])
    }
    // 处理Map，简单处理
    if (originValue instanceof Map) {
      return new Map([...originValue])
    }
    // 处理对象循环引用
    if (map.has(originValue)) {
      return map.get(originValue)
    }
    const newObj = Array.isArray(originValue) ? [] : {}
    map.set(originValue, newObj)
    for (const key in originValue) {
      newObj[key] = _deepClone(originValue[key])
    }
    // 对Symbol的key进行特殊的处理，因为Symbol作为key的时候不可迭代
    const symbolKeys = Object.getOwnPropertySymbols(originValue)
    for (const key of symbolKeys) {
      newObj[key] = _deepClone(originValue[key])
    }
    return newObj
  })(originValue)
}
