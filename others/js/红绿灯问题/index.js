/**
 * 红绿灯问题：
 *  绿灯一秒亮一次，黄灯2秒亮一次，红灯3秒亮一次
 *
 *  参考：http://www.10tiao.com/html/558/201701/2650964146/1.html
 *  https://github.com/mqyqingfeng/Blog/issues/98
 */

class Lights {
  current = 'green'

  constructor () {
    this.light = this.lights[Lights.current]

    this.lights = {
      'green': {
        ticker: 1000,
        next: () => {
          current = 'yellow'
        }
      },

      'yellow': {
        ticker: 1000,
        next: () => {
          current = 'red'
        }
      },

      'red': {
        ticker: 1000,
        next: () => {
          current = 'green'
        }
      }
    }
  }

  run() {

  }
}

// 初始实现 - 状态机
let current = 'green'
const lightMap = {
  run () {
    const color = current
    const light = this[ color ]

    setTimeout(() => {
      this.log(color)
      light.next()
      this.run()
    }, light.ticker)
  },

  log (color) {
    console.log(color, 'on.')
  },

  'green': {
    ticker: 1000,
    next: () => {
      current = 'yellow'
    }
  },

  'yellow': {
    ticker: 1000,
    next: () => {
      current = 'red'
    }
  },

  'red': {
    ticker: 1000,
    next: () => {
      current = 'green'
    }
  }
}

// lightMap.run()

// promise
const log = (color) => {
  console.log(color)
  return Promise.resolve(color)
}

const createPromise = (ticker, cb) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(cb && cb())
  }, ticker)
})

const start = () => {
  // createPromise(2000, () => 'green').then(log)
  // createPromise(4000, () => 'yellow').then(log)
  // createPromise(6000, () => 'red').then(log).then(() => start())
  Promise.resolve()
    .then(() => {
      return createPromise(1000, () => log('green'))
    })
    .then(() => {
      return createPromise(1000, () => log('yellow'))
    })
    .then(() => {
      return createPromise(1000, () => log('red'))
    })
    .then(() => start())
}

// start()


























