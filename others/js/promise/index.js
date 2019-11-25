/*
 Promises/A+ 规范 https://www.ituring.com.cn/article/66566
*/

// 简易版

const PENDING = 'PENDING'
const RESOLEVED = 'RESOLEVED'
const REJECTED = 'REJECTED'

// function MyPromiseSimple(fn) {
//   const that = this
//   that.state = PENDING
//   that.value = null
//   that.resolvedCallbacks = []
//   that.rejectedCallbacks = []

//   function resolve(value) {
//     if (that.state === PENDING) {
//       that.state = RESOLEVED
//       that.value = value
//       that.resolvedCallbacks.map(cb => cb(that.value))
//     }
//   }

//   function reject(value) {
//     if (that.state === PENGING) {
//       that.state = REJECTED
//       that.value = value
//       that.rejectedCallbacks.map(cb => cb(that.value))
//     }
//   }

//   try {
//     fn(resolve, reject)
//   } catch (e) {
//     reject(e)
//   }
// }

// MyPromiseSimple.prototype.then = function (onResolved, onRejected) {
//   const that = this
//   onResoleved = typeof onRejected === 'function' ? onResolved : v => v
//   onRejected = typeof onRejected === 'function'
//     ? onRejected
//     : r => {
//         throw r
//       }

//   if (that.state === PENDING) {
//     that.resolvedCallbacks.push(onResolved)
//     that.rejectedCallbacks.push(onRejected)
//   }

//   if (that.state === RESOLEVED) {
//     onResolved(that.value)
//   }

//   if (that.state === REJECTED) {
//     onRejected(that.value)
//   }
// }

function MyPromiseSimple(fn) {
  const that = this
  that.state = PENDING
  that.value = null
  that.resolvedCallbacks = []
  that.rejectedCallbacks = []

  function resolve(value) {
    if (that.state === PENDING) {
      that.state = RESOLEVED
      that.value = value
      that.resolvedCallbacks.map(cb => cb(that.value))
    }
  }

  function reject(value) {
    if (that.state === PENDING) {
      that.state = REJECTED
      that.value = value
      that.rejectedCallbacks.map(cb => cb(that.value))
    }
  }

  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

MyPromiseSimple.prototype.then = function(onResolved, onRejected) {
  const that = this

  onResolved = typeof onResolved === 'function' ? onResolved : v => v
  onRejected = typeof onRejected === 'function'
    ? onRejected
    : v => { throw v}

  if (that.state === PENDING) {
    that.rejectedCallbacks.push(onRejected)
    that.resolvedCallbacks.push(onResolved)
  }

  if (that.state === RESOLEVED) {
    onResolved(that.value)
  }

  if (that.state === REJECTED) {
    onRejected(that.value)
  }



new MyPromiseSimple((resolve, reject) => {
  setTimeout(() => {
    resolve(1111)
  }, 0)
}).then(v => console.log(v))
