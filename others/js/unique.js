// 数组去重

// 原始实现
// function unique (arr) {
//   var ret = []
//
//   for (var i = 0, arrLength = arr.length; i < arrLength; i++) {
//     for (var j = 0, retLength = ret.length; j < retLength; j++) {
//       if (arr[i] === ret[j]) {
//         break
//       }
//     }
//
//     if (j === retLength) {
//       ret.push(arr[i])
//     }
//   }
//
//   return ret
// }

// 基于原始实现的改进
// function unique (arr) {
//   var ret = []
//
//   for (var i = 0, arrLength = arr.length; i < arrLength; i++) {
//     var activeItem = arr[i]
//     if (ret.indexOf(activeItem) === -1) {
//       ret.push(activeItem)
//     }
//   }
//
//   return ret
// }

// function unique(array, isSorted) {
//   var res = []
//   var cached
//   for (var i = 0, len = array.length; i < len; i++) {
//     var item = array[i]
//     if (isSorted) {
//       if (!i || cached !== item) {
//         res.push(item)
//       }
//       cached = item
//     } else if (res.indexOf(item) === -1) {
//       res.push(item)
//     }
//   }

//   return res
// }

// function unique (array, isSorted, iterator) {
//   var res = []
//   var cached = []

//   for (var i = 0, len = array.length; i < len; i++) {
//     var item = array[i]
//     var computed = iterator ? iterator(item, i, array) : item
//     if (isSorted) {
//       if (!i || cached !== computed) {
//         res.push(item)
//       }
//       cached = computed
//     } else if (iterator) {
//       if (cached.indexOf(computed) === -1) {
//         res.push(item)
//         cached.push(computed)
//       }
//     } else if (res.indexOf(item) === -1) {
//       res.push(item)
//     }
//   }

//   return res
// }

// object map
// function unique (array) {
//   var obj = {}
//   return array.filter(function (item) {
//     var objKey = typeof item + JSON.stringify(item)
//     return obj.hasOwnProperty(objKey) ? false : (obj[objKey] = true)
//   })
// }

// es6
// 对对象数组，去重无效
// [ { a: 1 }, { a: 1 }, { a: 2 } ] => [ { a: 1 }, { a: 1 }, { a: 2 } ]
// const unique = arr => [...new Set(arr)]

const unique = function (arr) {
  const cached = new Map()
  return arr.filter(item => (!cached.has(item) && cached.set(item, 1)))
}

// test
var arr1 = [1, 2, 1, "1", "2", 1, "2"]
console.log(unique(arr1)) // [ 1, 2, '1', '2' ]
console.log(unique([{a: 1}, {a: 1}, {a: 2}], false, (item) => {
  return item.a
}))
