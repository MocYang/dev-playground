
const createRandomList = require('../utils/index')
const randomList = createRandomList(10, [-10, 10])
const fixedList = [4, -3, 5, -2, -1, 2, 6, -2]

/**
 * 算法1，穷举所有可能的子序列和，分别求子序列为：1，2，3。。。N时的最大值
 * 时间复杂度 O(N3)
 * @param {*} list
 */
const maxSubsequenceSum1 = (list = []) => {
  const length = list.length

  let maxSum = 0, currentSum = 0

  for (let i = 0; i < length; i++) {
    for (let j = i; j < length; j++) {

      currentSum = 0
      for (let k = i; k <= j; k++) {
        currentSum += list[k]
      }

      if (currentSum > maxSum) {
        maxSum = currentSum
      }
    }
  }

  return maxSum
}

const maxSubsequenceSum2 = (list) => {
  const length = list.length
  let maxSum = 0, currentSum

  for (let i = 0; i < length; i++) {
    currentSum = 0
    for (let j = 0; j < length; j++) {
      currentSum += list[j]

      if (currentSum > maxSum) {
        maxSum = currentSum
      }
    }
  }

  return maxSum
}

console.log(maxSubsequenceSum2(fixedList));
