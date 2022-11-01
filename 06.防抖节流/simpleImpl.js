// 防抖简单实现
function debounce(fn, wait) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, wait)
  }
}

// 节流简单实现
function throttle(fn, wait) {
  let lastTime = 0
  return function (...args) {
    const nowTime = Date.now()
    const timeDiff = wait - (nowTime - lastTime)
    if (timeDiff <= 0) {
      lastTime = nowTime
      fn.apply(this, args)
    }
  }
}
