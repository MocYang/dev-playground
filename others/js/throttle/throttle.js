/*
 * 基于时间戳
 **/
// function throttle (func, wait) {
//   var start = 0
//
//   return function () {
//     var context = this, args = arguments
//
//     var now = +new Date()
//
//     if (now - start >= wait) {
//       func.apply(context, args)
//       start = now
//     }
//   }
// }

/*
 * 基于定时器
 **/
// function throttle (func, wait) {
//   var timer
//   return function () {
//     var context = this
//     var args = arguments
//
//     if (!timer) {
//       timer = setTimeout(function () {
//         timer = null
//         func.apply(context, args)
//       }, wait)
//     }
//   }
// }


/*
 * 结合
 */

function throttle (func, wait, options) {
  var timeout
  var context
  var args
  var result

  var previous = 0

  options = options || {
    leading: true, // 是否禁用第一次执行
    trailing: true // 是否禁用最后一次回调
  }

  var later = function () {
    previous = !options.leading ? 0 : +new Date()
    timeout = null
    func.apply(context, args)
    if (!timeout) {
      context = args = null
    }
  }

  var throttled = function () {
    var now = +new Date()

    if (!previous && !options.leading) {
      previous = now
    }

    context = this
    args = arguments
    var remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing) {
      timeout = setTimeout(later, remaining)
    }
  }

  throttled.cancel = function () {
    clearTimeout(timeout)
    timeout = null
    previous = 0
  }

  return throttled
}

