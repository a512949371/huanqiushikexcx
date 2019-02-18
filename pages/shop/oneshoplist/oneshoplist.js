// pages/shop/oneshoplist/oneshoplist.js
import Request from '../../../jsondata/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // shopdata: [{
    //   shopimg: '/images/shop2.png',
    //   shopname: '代餐粉',
    //   shopdesc: '代餐粉是一种由谷类、豆类、薯类食材等为主...',
    //   shopprice: '498',
    //   shopcompany: '2盒',
    //   isworld: false
    // },
    // {
    //   shopimg: '/images/shop3.png',
    //   shopname: '代餐粉',
    //   shopdesc: '代餐粉是一种由谷类、豆类、薯类食材等为主...代餐粉是一种由谷类、豆类、薯类食材等为主...',
    //   shopprice: '498',
    //   shopcompany: '2盒',
    //   isworld: true
    // },
    // {
    //   shopimg: '/images/shop4.png',
    //   shopname: '代餐粉',
    //   shopdesc: '代餐粉是一种由谷类、豆类、薯类食材等为主...',
    //   shopprice: '498',
    //   shopcompany: '2盒',
    //   isworld: false
    // },
    // {
    //   shopimg: '/images/shop5.png',
    //   shopname: '代餐粉',
    //   shopdesc: '代餐粉是一种由谷类、豆类、薯类食材等为主...',
    //   shopprice: '498',
    //   shopcompany: '2盒',
    //   isworld: false
    // },],
    shopdata: [],
    pagedata: {
      pageNo: 1,
      pageSize: 10,
      id: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      'pagedata.id': options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this._ajaxdata(1)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.data.pagedata.pageNo = 1;
    this.setData({
      pagedata: this.data.pagedata
    })
    this._ajaxdata(2)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.data.pagedata.pageNo++;
    this.setData({
      pagedata: this.data.pagedata
    })
    this._ajaxdata(1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  _goshopdetail(e) {
    wx.navigateTo({
      url: '/pages/shop/detail/detail?id='+e.currentTarget.dataset.id,
    })
  },
  _ajaxdata(num) {
    if (num == 2) {
      this.data.shopdata = []
    }
    Request.ShopClass(this.data.pagedata, (res) => {
      if (res.data.isOK) {
        if (res.data.data != null && res.data.data.length > 0) {
          this.setData({
            shopdata: this.data.shopdata.concat(res.data.data),
            'pagedata.pageNo': this.data.pagedata.pageNo
          })
        } else {
          if (num == 1) {
            this.setData({
              shopdata: this.data.shopdata,
              'pagedata.pageNo': this.data.pagedata.pageNo--
            })
          }
        }
      } else {
        console.log("err", res)
      }
    })
  }
})