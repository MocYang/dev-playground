//app.js
App({
  onLaunch: function ({path, query, scene, shareTicket, refererinfo}) {
    console.log('App onLaunch emit (初始化完成)--------')
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log('login success------')
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('getSetting success call------')
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log('getUserInfo success')
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // 参数同onLaunch
  onShow: function () {
    console.info('App onShow emit(小程序启动/后台进入前台)-----------')
  },
  onHide: function () {
    console.info('App onHide emit(进入后台)--------')
  },
  onError: function (error) {
    console.error('App 出错 --------')
  },
  onPageNotFound: function ({path, query, isEntryPage}) {
    console.info('page not found------')
  },
  globalData: {
    userInfo: null
  }
})
