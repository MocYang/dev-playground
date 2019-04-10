/**
 * 桶式排序 - 设有N个数，大小为0-M，新建一个辅助数组表Count,遍历给定数组Arr,使Count[Arr[i]] = 1,
 * 遍历Count表，输出排序后的值即可。
 * 时间复杂度：O（N+M）,
 * 局限：需要太多的额外空间，可能丢失部分值
 */

const utils = require('../utils/index')
const {createRandomList, getRuntime} = utils
const bucketSort = arr => {
  let Count = Array(arr.length).fill(0)
  for (let x of arr) {
    Count[x] += 1
  }

  return Count.reduce((ret, x, i) => {
    if (!x) {
      return ret
    }
    return ret.concat(...Array(x).fill(i))
  }, [])
}

// const testArr = createRandomList(10)
// console.log(testArr)
// console.log(bucketSort(testArr))
//
// const largeArr = createRandomList(1000000, [0, 10000])
// console.log(getRuntime(() => {
//   bucketSort(largeArr)
// }))

// [ 0, 7, 9, 8, 8, 5, 7, 9, 0, 2 ]
// [ 2, 5, 7, 8, 9 ]

// TODO: 基数排序
const radixSort = (arr, base = 10) => {
  let max = Math.max(...arr)
  let iterateCount = 0
  while (max >= 1) {
    max /= base
    iterateCount++
  }
  let increaseBase = 1
  let ret = []
  let tempArr = []
  for (let i = 0; i < iterateCount; i++) {
    ret = Array(base).fill(1).map(() => [])
    if (Array.isArray(tempArr[0])) {
      for (let k = 0; k < tempArr.length; k++) {
        let sub = tempArr[k]
        for (let t = 0; t < sub.length; t++) {
          let number = sub[t]
          if (number >= increaseBase) {
            let remainder = Math.floor(number / increaseBase % 10)
            ret[remainder].push(number)
          } else {
            ret[0].push(number)
          }
        }
      }
    } else {
      for (let j = 0; j < arr.length; j++) {
        let number = arr[j]
        let remainder = number % base
        ret[remainder].push(number)
      }
    }

    increaseBase *= base
    tempArr = ret
  }
  console.log(ret)
  return ret
}
const arr = [64, 8, 216, 512, 27, 729, 0, 1, 343, 125]
radixSort(arr)
radixSort([122, 100, 0, 22, 4, 333, 1990, 235, 76])



