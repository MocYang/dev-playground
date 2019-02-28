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

function throttle (func, wait) {
  var timer
  var start = 0

  return function () {
    var context = this
    var args = arguments
    var now = +new Date()

    if (timer) {
      timer = setTimeout(function () {
        func.apply(context, args)
        timer = null
        start = now
      }, wait)

      // 第一次触发
    } else {
      if (now - start >= wait) {
        func.apply(context, args)
        start = now

        timer = 1
      }
    }
  }
}

