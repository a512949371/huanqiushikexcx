// pages/outoffice/outoffice.js
import Request from '../../jsondata/request.js';
import Common from '../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    groupid:'',
    detail:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      groupid: options.groupid
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
    Request.OutInfo(this.data.id,(res)=>{
      if(res.data.isOK){
        this.setData({
          detail: res.data.data
        })
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
  _save(){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '您确定要在该团出局吗',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          let data = {
            id: that.data.detail.id,
            accountRankConfigId: that.data.detail.accountRankConfigId
          }
          Request.Trueout(data, (res) => {
            if (res.data.isOK) {
              Common.Toast('出局成功')
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/world/world',
                })
              }, 1000)
            } else {
              Common.Toast(res.data.msg)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })  
  }
})