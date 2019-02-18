// pages/my/myfinance/myfinance.js
import Request from '../../../jsondata/request.js';
import Common from '../../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navindex: 1,
    pagedata: {
      pageNo: 0,
      pageSize: 10,
      type: 1
    },
    shopdata: '',
    shopdatalist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    this._ajaxdata(2)
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
    this.setData({
      'pagedata.pageNo': 0
    })
    this._ajaxdata(2)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.data.pagedata.pageNo++
    this.setData({
      'pagedata.pageNo': this.data.pagedata.pageNo
    })
    this._ajaxdata(1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //选择类型
  _changenav(e) {
    if (e.currentTarget.dataset.type==2){
      this.data.pagedata.type=-1
    }else{
      this.data.pagedata.type = 1
    }
    this.setData({
      navindex: e.currentTarget.dataset.type,
      'pagedata.type': this.data.pagedata.type,
      'pagedata.pageNo': 0
    })
    this._ajaxdata(2)
  },
  _ajaxdata(num) {
    if (num == 2) {
      this.data.shopdatalist = [];
    }
    Request.Finance(this.data.pagedata, (res) => {
      wx.stopPullDownRefresh()
      if (res.data.isOK) {
        this.setData({
          shopdata: res.data.data
        })
        if (res.data.data.list != null && res.data.data.list.length > 0) {
          this.setData({
            shopdatalist: this.data.shopdatalist.concat(res.data.data.list),
            'pagedata.pageNo': this.data.pagedata.pageNo
          })
        } else {
          if (num == 1 && this.data.pagedata.pageNo != 1) {
            this.data.pagedata.pageNo--
            this.setData({
              shopdatalist: this.data.shopdatalist,
              'pagedata': this.data.pagedata
            })
          } else {
            this.setData({
              shopdatalist: this.data.shopdatalist
            })
          }
        }
        console.log("data", this.data.pagedata)
      } else {
        console.log("err", res)
      }
    })
  },
})