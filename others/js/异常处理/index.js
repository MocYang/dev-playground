/* 异常处理
 *
 */
// 参考： https://mp.weixin.qq.com/s/UYT42aiZ4oVbVmcoR2LrhQ
// 1 回调
// function fetch (cb) {
//   setTimeout(() => {
//     console.log('请求异常')
//   })
// }
//
// fetch(() => {
//   console.log('请求处理')
// })


// 回调，无法捕获的异常
// function fetch (cb) {
//   setTimeout(() => {
//     throw new Error('请求异常') // 异步抛出的异常，回调中无法捕获
//   })
// }
//
// try {
//   fetch(() => {
//     console.log('请求处理')
//   })
// } catch (e) {
//   console.error('异常触发')
// }

// 3 回调，不可控的异常
// function fetch (error, cb) {
//   setTimeout(() => {
//     error('处理异常')
//   })
// }
//
// fetch((msg) =>{
//   console.error(msg)
// }, () => {
//   console.log('请求处理')
// })

// 4 Promise 异常处理
// function fetch (cb) {
//   return new Promise((resolve, reject) => {
//     throw Error('请求异常')
//   })
// }
//
// fetch().then(() => {
//   console.log('请求处理')
// }, (e) => {
//   console.error(e)
// })

// 5 Promise无法捕获的异常 macrotask抛出的异常不在当前执行上下文
// function fetch (cb) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       throw new Error('请求异常')
//     })
//   })
// }
//
// fetch().then(() => {
//   console.log('请求处理') // 无法执行
// }).catch(e => {
//   console.error('请求异常') // 无法执行
// })




