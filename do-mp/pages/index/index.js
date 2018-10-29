//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    activities: [
      {
        id: '1001',
        name: 'A',
        url: ''
      },
      {
        id: '1002',
        name: 'B',
        url: ''
      }
    ]
  },

  // 事件处理函数
  bindViewTap: function () {
    wx.switchTab({
      url: '../person/index'
    })
  },
  onLoad: function (query) {
    console.log('Page Index onLoad emit-------------')
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  onUnload: function () {
    console.log('Page Index onUnload (页面卸载)--------')
  },

  onShow: function () {
    console.log('Page Index onShow （页面显示）--------')
    console.log('Page route: ', this.route)
  },

  onReady: function () {
    console.log('Page Index onReady (页面初次渲染完成)--------')
  },

  onHide: function () {
    console.log('Page Index onHide（页面隐藏）--------')
  },

  onPullDownRefresh: function () {
    console.log('page Index onPullDownRefresh(下拉刷新)--------')
  },

  onReachBottom: function () {
    console.log('Page Index onReachBottom(上拉到底)--------')
  },

  onShareAppMessage: function ({ from, target, webViewUrl }) {
    console.log('Page Index OnShareAppMessage(用户点击右上角转发)--------')
    return {
      title: 'Do',
      path: 'pages/C/index',
      imageUrl: ''
    }
  },

  onTabItemTap: function ({ index, pagePath, text }) {
    console.log('Page Index onTabItemTap(点击了当前页的tab)--------')
    console.log('当前Tab 的index：', index)
    console.log('当前Tab 的页面路径：', pagePath)
    console.log('当前Tab 的按钮文字：', text)
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  startPullDownRefresh: function () {
    wx.startPullDownRefresh()

    // 自动结束下拉刷新状态
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },
  getRefreshElement: function (e) {
    console.log(e)
    const query = wx.createSelectorQuery()
    query.select('#btn-refresh').boundingClientRect(function (res) {
      console.log(res)
    })
    query.selectViewport().scrollOffset(function(res){
      console.log(res)
    })
    query.exec()
  }
})
