/**
 * 解析cookie字符串，返回键值对对象
 * @param str
 * @returns {*}
 */
export const parseCookie = str =>
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
      return acc
    })

/**
 * 获取随机的hex颜色值
 * @returns {string}
 */
export const getRandomHexColor = () => `#${(Math.random() * 0xffffff).toString(16).slice(-6)}`

/**
 * 返回某个函数执行的时间
 * @param fn
 * @returns {*}
 */
export const timeTaken = (fn) => {
  console.time('timeTaken')
  const res = fn()
  console.timeEnd('timeTaken')
  return res
}

export const toDecimalMark = (num, type = 'en-US') => num.toLocaleString(type)
console.log(toDecimalMark(1234567325.234)) // "1,234,567,325.234"
