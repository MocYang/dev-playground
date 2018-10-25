//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    src: null
  },
  onLoad: function (query) {
    console.log('Page C onLoad------')
    console.log(query)
  },
  handleChooseImage: function () {
    wx.chooseImage({
      success: (res) => {
        console.log(res)
        this.setData({
          src: res.tempFilePaths[0]
        })
      }
    })
  },

  handleOfficialAccountLoad: function (res) {
    console.log(res)
  }
})
