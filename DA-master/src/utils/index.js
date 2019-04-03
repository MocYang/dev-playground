/**
 * 生成给定范围内的指定数量的随机数数组
 * @param number
 * @param range
 * @param sort
 * @returns {Array}
 */
const createRandomList = (number, range = [0, number], sort = false) => {
  const min = Math.min(range[0], range[1])
  const max = Math.max(range[0], range[1])
  const list = []

  for (let i = 0; i < number; i++) {
    list.push(Math.floor(Math.random() * (max - min + 1) + min))
  }

  return sort ? list.sort((a, b) => a - b) : list
}

// modules.export = createRandomList
