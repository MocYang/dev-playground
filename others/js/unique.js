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

// test
// var arr1 = [1, 2, 1, '1', '2', 1, '2']
// console.log(unique(arr1)) // [ 1, 2, '1', '2' ]

