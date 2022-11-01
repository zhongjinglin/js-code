// 方式一：普通递归
function flatForBasic(array, depth = 1) {
  const arr = []
  ;(function deep(array, depth) {
    for (let index = 0; index < array.length; index++) {
      const current = array[index]
      if (Array.isArray(current) && depth > 0) deep(current, depth - 1)
      else arr.push(current)
    }
  })(array, depth)
  return arr
}

// 方式二：利用reduce特性
function flatForReduce(array, depth = 1) {
  return array.reduce(function (acc, cur) {
    if (depth <= 0) return array
    return acc.concat(Array.isArray(cur) ? flatForReduce(cur, depth - 1) : cur)
  }, [])
}
