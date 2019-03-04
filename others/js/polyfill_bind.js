/*
 * bind 的模拟实现
 */

// 返回一个函数，且使用传入的context作为函数调用的this
// function _bind (context) {
//   var self = this
//   return function () {
//     return self.apply(context)
//   }
// }

// 解决传参问题
// function _bind (context) {
//   var initArgs = Array.prototype.slice.call(arguments, 1)
//   var self = this
//   return function () {
//     var realArgs = Array.prototype.slice.call(arguments, 1)
//     return self.apply(context, initArgs.concat(realArgs))
//   }
// }

// 解决通过构造函数调用的问题
function _bind(context) {
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var self = this
  var initArgs = Array.prototype.slice.call(arguments, 1)

  var fn = function () {}

  var returnFunc = function () {
    var realArgs = Array.prototype.slice.call(arguments, 1)
    return self.apply(this instanceof returnFunc ? this : context, initArgs.concat(realArgs))
  }
  fn.prototype = this.prototype
  returnFunc.prototype = new fn()
  return returnFunc
}
