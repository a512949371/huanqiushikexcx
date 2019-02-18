// pages/befindex/befindex.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    formId: '',
    isother:'',
    shopid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("opt",options.url)
    if (options.url){
      if (options.url==2){
        this.setData({
          shopid: options.shopid
        })
      }
      this.setData({
        isother: options.url
      })
    }
    wx.onNetworkStatusChange(function (res) {
      console.log("wangluo", res.isConnected)
      console.log(res.networkType)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.isother==''){
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindGetUserInfo: function (e) {
    var that = this;
    var userData = JSON.parse(e.detail.rawData)
    wx.setStorage({
      key: 'nick',
      data: userData.nickName,
    })
    wx.setStorage({
      key: 'headpic',
      data: userData.avatarUrl,
    })
    var wxdata = {
      nickName: userData.nickName,
      avatarUrl: userData.avatarUrl,
    }
    switch (this.data.isother){
      case '1':
        wx.switchTab({
          url: '/pages/world/world',
        })
        break;
      case '2':
        wx.redirectTo({
          url: '/pages/shop/detail/detail?id='+this.data.shopid,
        })
        break;
      default:
        wx.switchTab({
          url: '/pages/index/index',
        })
        break;
    }
  },

})