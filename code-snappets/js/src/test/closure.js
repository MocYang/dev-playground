/*
 * 闭包webpack输出测试
 */

let ret = []

for (let i = 0; i < 10; i++) {
  ret[i] = function () {
    console.log(i)
  }
}

ret[0]()
ret[1]()
ret[2]()
