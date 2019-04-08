/**
 * 桶式排序 - 设有N个数，大小为0-M，新建一个辅助数组表Count,遍历给定数组Arr,使Count[Arr[i]] = 1,
 * 遍历Count表，输出排序后的值即可。
 * 时间复杂度：O（N+M）,
 * 局限：需要太多的额外空间，可能丢失部分值
 */

const utils = require('../utils/index')
const { createRandomList, getRuntime } = utils
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

const testArr = createRandomList(10)
console.log(testArr)
console.log(bucketSort(testArr))

const largeArr = createRandomList(1000000, [0, 10000])
console.log(getRuntime(() => {
  bucketSort(largeArr)
}))

// [ 0, 7, 9, 8, 8, 5, 7, 9, 0, 2 ]
// [ 2, 5, 7, 8, 9 ]

