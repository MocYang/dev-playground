// 欧几里得算法
const getGcd = (m, n) => {
  let rem = 1
  while (n > 0) {
    rem = m % n
    m = n
    n = rem
  }
  return m
}

console.log(getGcd(55, 15))
