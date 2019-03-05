/*
 * new 的模拟实现
 */

function Person (name, age) {
  this.name = name
  this.age = age
}

Person.prototype.job = 'worker'

Person.prototype.sayName = function () {
  return this.name
}

Person.prototype.sayAge = function () {
  return this.age
}

function objFactory () {
  var ret = {}
  var Cstr = Array.prototype.shift.call(arguments)
  ret.__proto__ = Cstr.prototype
  var returnedObj = Cstr.apply(ret, arguments)
  return(returnedObj !== null && typeof returnedObj === 'object') ? returnedObj : ret
}

var p = objFactory(Person, 'Bill', 12)
console.log(p)
console.log(p instanceof Person)
console.log(p.sayName())
console.log(p.job)
