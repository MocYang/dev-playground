import Mock from 'mockjs'

/**
 * 参考mockjs文档：https://github.com/nuysoft/Mock/wiki
 * @param url url正则表达式
 * @param method 请求的方法
 * @param handler 处理响应的方法
 */
Mock.mock(/\/api\/info/, 'get', req => {
  return {
    msg: 'success'
  }
})
