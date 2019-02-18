// pages/my/messagecenter/messagecenter.js
import Request from '../../../jsondata/request.js';
import Common from '../../../utils/common.js';
import FormatTime from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagedata:{
      pageNo:1,
      pageSize:10
    },
    shopdatalist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that=this;
    Common.isToken().then((res)=>{
      if (res.success){
        that._ajaxdata(2)
      }else{
        console.log("err",res)
      }
    })
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
    this.setData({
      'pagedata.pageNo':1
    })
    this._ajaxdata(2)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.pagedata.pageNo++;
    this.setData({
      'pagedata.pageNo': this.data.pagedata.pageNo
    })
    this._ajaxdata(1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  _ajaxdata(num) {
    if (num == 2) {
      this.data.shopdatalist = [];
    }
    Request.UserMessage(this.data.pagedata, (res) => {
      wx.stopPullDownRefresh()
      if (res.data.isOK) {
        if (res.data.data != null && res.data.data.length > 0) {
          res.data.data = res.data.data.map((item) => {
            if (item.createTime != null && item.createTime != '') {
              item.createTime = FormatTime.timeStampToTime(item.createTime)
            }
            item.content = JSON.parse(item.content)
            return item
          })
          this.setData({
            shopdatalist: this.data.shopdatalist.concat(res.data.data),
            'pagedata.pageNo': this.data.pagedata.pageNo
          })
        } else {
          if (num == 1 && this.data.pagedata.pageNo != 1) {
            this.data.pagedata.pageNo--
            this.setData({
              shopdatalist: this.data.shopdatalist,
              'pagedata': this.data.pagedata
            })
          }
        }
        console.log(this.data.shopdatalist)
      } else {
        console.log("err", res)
      }
    })
  },
})