/**
 * apply 的模拟实现
 */

var _apply = function (context, argsArr) {
  context.fn = this || window
  var result
  if (!argsArr) {
    result = context.fn()
  } else {
    var args = []
    for (var i = 0; i < argsArr.length; i++) {
      args.push('argsArr[' + i + ']')
    }
    result = eval('context.fn(' + args + ')')
  }

  delete context.fn
  return result
}

Function.prototype._apply = _apply

// test
var value = 1
var obj = {
  value: 2
}

function foo (value) {
  console.log(this.value)  // 2
  console.log(arguments)   // { '0': 1, '1': 33 }
}

foo._apply(obj, [ value, 33 ])



