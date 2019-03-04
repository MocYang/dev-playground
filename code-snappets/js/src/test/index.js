/*
 * 闭包webpack输出测试
 */
//
// let ret = []
//
// for (let i = 0; i < 10; i++) {
//   ret[i] = function () {
//     console.log(i)
//   }
// }

// ret[0]()
// ret[1]()
// ret[2]()

// var funcs = []
// var obj = {a: 1, b: 2, c: 3}
// for (let key in obj) {
//   funcs.push(function () {
//     console.log(key)
//   })
// }
//
// funcs[0]()

// function foo (name) {
//
//   var value0 = { a: '00' }
//
// // const 常量
//   const value1 = { b: '11' }
//
// // 块级let
//   let value2 = { c: '2' }
//
//   var value3 = value1.b + value2.c
//   console.log(value0)
//   console.log(value1)
//   console.log(value2)
//   console.log(value3)
//
//   console.log(name)
// }
//
// let name = +new Date()
// console.log(window.name)
// console.log(name)
//
// setTimeout(() => {
//   foo(name)
// }, 1000)
