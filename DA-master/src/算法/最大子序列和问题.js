/**
 * 算法1
 *  时间复杂度 O(N3)
 */

const createRandomList = require('../utils/index')
const randomList = createRandomList(10, [-10, 10])
console.log(randomList)

/**
 * 算法1，穷举所有可能的子序列和，分别求子序列为：1，2，3。。。N时的最大值
 * @param {*} list
 */
const maxSubsequenceSum1 = (list = []) => {
  const length = list.length

  let maxSum = 0, currentSum = 0

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {

      currentSum = 0
      let subSequence = []
      for (let k = i; k <= j; k++) {
        currentSum += list[k]
        subSequence.push(list[k])
      }

      if (currentSum > maxSum) {
        maxSum = currentSum
      }
      console.log(subSequence)
    }
  }

  return maxSum
}
console.log(maxSubsequenceSum1(randomList))

