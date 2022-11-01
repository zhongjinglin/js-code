// 防抖完整实现
function debounce(fn, wait, options = { leading: false, trailing: true }) {
  const { leading, trailing, maxWait } = options
  let isFirst = true
  let waitTimer = null
  let maxWaitTimer = null

  function _debounce(...args) {
    if (leading && isFirst) {
      isFirst = false
      fn.apply(this, args)
      return
    }
    if (waitTimer) {
      clearTimeout(waitTimer)
    }
    if (trailing) {
      waitTimer = setTimeout(() => {
        if (maxWaitTimer) {
          clearTimeout(maxWaitTimer)
          maxWaitTimer = null
        }
        waitTimer = null
        isFirst = true
        fn.apply(this, args)
      }, wait)
    }
    if (maxWait && !maxWaitTimer) {
      maxWaitTimer = setTimeout(() => {
        clearTimeout(maxWaitTimer)
        maxWaitTimer = null
        fn.apply(this, args)
      }, maxWait)
    }
  }

  _debounce.cancel = function () {
    isFirst = true
    if (waitTimer) {
      clearTimeout(waitTimer)
      waitTimer = null
    }
    if (maxWaitTimer) {
      clearTimeout(maxWaitTimer)
      maxWaitTimer = null
    }
  }

  return _debounce
}

// 节流完整实现
function throttle(fn, wait, options = { leading: true, trailing: false }) {
  const { leading, trailing } = options
  let lastTime = 0
  let timer = null

  function _throttle(...args) {
    const nowTime = Date.now()
    if (!leading && !lastTime) {
      lastTime = nowTime
    }
    const timeDiff = wait - (nowTime - lastTime)
    if (timeDiff <= 0) {
      lastTime = nowTime
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      fn.apply(this, args)
      return
    }
    if (trailing && !timer) {
      timer = setTimeout(() => {
        timer = null
        lastTime = leading ? Date.now() : 0
        fn.apply(this, args)
      }, timeDiff)
    }
  }

  _throttle.cancel = function () {
    lastTime = 0
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return _throttle
}
