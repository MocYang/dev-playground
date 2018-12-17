
// 验证手机号
export const isValidPhone = phone => /^1\d{10}$/.test(phone)

// 验证邮箱
export const isValidEmail = email => /^[a-z0-9A-Z]+([._\\-]*[a-z0-9A-Z])*@([a-z0-9A-Z]+[-a-z0-9A-Z]*[a-z0-9A-Z]+\.){1,63}[a-z0-9A-Z]+$/.test(email)

export const isArray = arr => Object.prototype.toString.call(arr) === '[object Array]'

export const isPlainObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

export const isString = str => Object.prototype.toString.call(str) === '[object String]'

export const isNumber = num => Object.prototype.toString.call(num) === '[object Number]'

// 深克隆对象/数组
export const deepClone = obj => {
  let ret
  if (isPlainObject(obj)) {
    ret = {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const attrValue = obj[key]
        if (isPlainObject(attrValue) || isArray(attrValue)) {
          ret[key] = deepClone(attrValue)
        } else {
          ret[key] = attrValue
        }
      }
    }
  } else if (isArray(obj)) {
    ret = []
    for (let val of obj) {
      if (isArray(val) || isPlainObject(val)) {
        ret.push(deepClone(val))
      } else {
        ret.push(val)
      }
    }
  }

  return ret
}

// 节流函数
export const throttle = (fn, time = 20) => {
  let now = Date.now()
  let timer = null
  return (...args) => {
    const cur = Date.now()
    if (cur - now <= time) {
      now = cur
      return
    }
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn(...args)
    }, time)
  }
}
