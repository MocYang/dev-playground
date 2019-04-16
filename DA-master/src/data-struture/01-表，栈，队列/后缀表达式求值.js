/**
 * 后缀表达式。或者逆波兰表达式
 * 约定：输入的字符串序列以空格分隔
 *
 * 6 5 2 3 + 8 * + 3 + *
 */

const ArrayStack = require('./栈.js').ArrayStack

const regExpGroup = {
  number: /[0-9]/,
  sign: /(\+|-|\*|\/|)/
}

const postfix = (stringSeq = '') => {
  const inputArr = stringSeq.split(' ')
  const stack = new ArrayStack()
  let ret = 0
  for (let char of inputArr) {
    if (regExpGroup.number.test(char)) {
      stack.push(Number(char))
    } else if (regExpGroup.sign.test(char)) {
      const opt1 = stack.pop()
      const opt2 = stack.pop()
      const retOfMiddle = eval(`${opt1} ${char} ${opt2}`)
      stack.push(retOfMiddle)
    }
  }
  ret = stack.pop()
  return ret
}
let testString = '6 5 2 3 + 8 * + 3 + *'
console.log(postfix(testString)) // 288
