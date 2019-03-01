/**
 * call 模拟实现
 */

var _call = function (context) {
  // 获取目标上下文
  context.fn = this || window

  var args = []

  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i +']')
  }

  // 以提供的参数调用
  var result = eval('context.fn(' + args + ')')
  delete context.fn
  return result
}

Function.prototype._call = _call

// test
var value = 1
var obj = {
  value: 2
}
function foo (value) {
  console.log(this.value) // 2
  console.log(value) // 1
}

foo._call(obj, value)
