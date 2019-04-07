/**
 *
 * 求给定序列的全排列
 */

const fixedList = [1, 2, 3]

// 求给定序列的所有可能的组合
const fullArrange = (list) => {
  const length = list.length
  let ret = []
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i; j++) {
      let sequence = []
      for (let k = j; k <= (j + i); k++) {
        sequence.push(list[k])
      }
      // console.log(sequence)
      ret.push(permute(sequence))
    }
  }
  return ret
}

// 求给定序列的全排列
const permute = (list) => {
  if (list.length <= 1) {
    return list
  }
  let ret = []
  for (let i = 0; i < list.length; i++) {
    let sub = list.slice(0, i).concat(list.slice(i + 1))
    let subPermute = permute(sub)
    for (let x of subPermute) {
      ret.push(list.slice(i, i + 1).concat(x))
    }
  }
  return ret
}

console.log(fullArrange(fixedList))

// console.log(permute([1, 2, 3]))
/*
  [ [ 1, 2, 3 ],
  [ 1, 3, 2 ],
  [ 2, 1, 3 ],
  [ 2, 3, 1 ],
  [ 3, 1, 2 ],
  [ 3, 2, 1 ] ]
 */


