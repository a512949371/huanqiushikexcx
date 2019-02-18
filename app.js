//app.js
App({
  onLaunch: function (options) {
    // 展示本地存储能力
    console.log(options)
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
  },
  globalData: {
    userInfo: null
  }
})