/*
 * 类型判断
 */

/*
 * 方法工具：
 *  1 typeof
 *  2 constructor
 *  3 instanceof
 *  4 Object.prototype.toString.call()
 */

const objectToString = (type) => Object.prototype.toString.call(type)

console.log(typeof undefined) // undefined
console.log(typeof null)      // object
console.log(typeof 1)         // number
console.log(typeof 'a')       // string
console.log(typeof {})        // object
console.log(typeof true)      // boolean

console.log(typeof function () {
})  // function

// object -> Array, Function, Date, RegExp, Error, Window, Location, History...
console.log(typeof new Set())      // object
console.log(typeof new Map())      // object

//
console.log(objectToString(undefined)) // [object Undefined]
console.log(objectToString(null))      // [object Null]
console.log(objectToString(1))         // [object Number]
console.log(objectToString('a'))       // [object String]
console.log(objectToString({}))        // [object Object]
console.log(objectToString(true))      // [object Boolean]
console.log(objectToString(/a/))      // [object RegExp]
console.log(objectToString(new Date()))      // [object Date]
console.log(objectToString(new Error()))      // [object Error]
console.log(objectToString(Math))      // [object Math]
console.log(objectToString(JSON))      // [object JSON]

console.log(objectToString(function () {
}))  // [object Function]

console.log(objectToString(new Set()))      // [object Set]
console.log(objectToString(new WeakSet()))      // [object WeakSet]
console.log(objectToString(new Map()))      // [object Map]
console.log(objectToString(new WeakMap()))      // [object WeakMap]


//
var classToType = {}

var toString = classToType.toString
var hasOwn = classToType.hasOwnProperty
;([
  'Number',
  'String',
  'Object',
  'Boolean',
  'Array',
  'RegExp',
  'Date',
  'Error',
  'Function'
]).map(function (type) {
  classToType[ '[object ' + type + ']' ] = type.toLowerCase()
})

var getType = function (type) {
  if (type == null) {
    return type + ''
  }

  return (typeof type == 'object' || typeof type == 'function')
    ? classToType[ Object.prototype.toString.call(type) ] || 'object'
    : typeof type
}

var isPlainObject = function (obj) {
  var proto
  var Ctor

  // 排除非object，和window，Location等
  if (!obj || toString(obj) !== '[object Object]') {
    return false
  }

  proto = Object.getPrototypeOf(obj)

  // Object.create(null)创建的对象，没有原型
  if (!proto) {
    return true
  }

  // 以下，判断通过new Object()创建的对象
  Ctor = hasOwn.call(proto, 'constructor') && proto.constructor

  return typeof Ctor === 'function' && hasOwn.toString().call(Ctor) === hasOwn.toString.call(Object)
}


var isEmptyObject = function (obj) {
  for (var name in obj) {
    return false
  }

  return true
}

var isWindow = function (obj) {
  return obj != null && obj === window && obj === obj.window
}
