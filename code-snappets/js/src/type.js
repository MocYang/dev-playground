/**
 * 获取变量的类型
 * @param v
 * @returns {string}
 */
export const getType = v => v === undefined ? 'undefined' : (v === null ? 'null' : v.constructor.name.toLowerCase())

/**
 * 判断给定的val,是否是给定的type
 * @param val
 * @param type
 */
export const is = (val, type) => (![, null].includes(val)) && val.constructor.name.toLowerCase() === type.toLowerCase()

export const isBoolean = (val) => typeof val === 'boolean'

export const isFunction = val => typeof val === 'function'

export const isNumber = val => typeof val === 'number'

export const isObject = val => val === Object(val)

export const isPlainObject = val => Object.prototype.toString.call(val) === '[object Object]'

export const isPrimitive = val => val !== Object(val)

export const isString = val => typeof val === 'string'

export const isValidJSON = obj => {
  try {
    JSON.parse(obj)
    return true
  } catch (e) {
    return false
  }
}
