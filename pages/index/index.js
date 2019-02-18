//index.js
//获取应用实例
import Request from '../../jsondata/request.js';
import Common from '../../utils/common.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagedata:'',
    swiperIndex:0,
    duration:1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Request.Login().then((res) => {
      console.log("?", res)
    }).catch((res) => {
      console.log("??", res)
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
    var that =this;
    Request.Index('',(res)=>{
      if (res.data.isOK){
        that.setData({
          pagedata:res.data.data
        })
      }else{
        console.log("err",res)
      }
    })
    var that = this
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
  //滑动广告图
  _changeSwiper: function (e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },
  _gonewdetail(e){
    wx.navigateTo({
      url: '/pages/index/newdetail/newdetail?id='+e.currentTarget.dataset.id,
    })
  },
  _goshopdetail(e){
    wx.navigateTo({
      url: '/pages/shop/detail/detail?id='+e.currentTarget.dataset.id,
    })
  }
})