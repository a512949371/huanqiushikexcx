// pages/my/myorder/myorder.js
import Request from '../../../jsondata/request.js';
import Common from '../../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navindex:1,
    pagedata: {
      pageNo: 0,
      pageSize: 10,
      showType:0
    },
    shopdatalist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navindex: options.type||1,
      'pagedata.showType': Number(options.type)-1||0
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
    var that=this;
    Common.isToken().then((res) => {
      if (res.success) {
        that._ajaxdata(2)
      } else {
        console.log("err", res)
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
      'pagedata.pageNo': 0
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
  //选择订单类型
  _changenav(e){
    var that=this;
    const type =e.currentTarget.dataset.type;
       this.setData({
         navindex: type,
         'pagedata.pageNo': 0,
         'pagedata.showType': type-1
       })
        that._ajaxdata(2)
  },
  //取消订单
  _cancalorder(e){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '您确定要取消该订单吗',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          Request.CancalOrder(e.currentTarget.dataset.id, (res) => {
            if (res.data.isOK) {
              Common.Toast('取消成功')
              this.setData({
                'pagedata.pageNo': 0,
              })
              that._ajaxdata(2);
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  //催单发货
  _calldelivergood(){
    Common.Toast('催单成功，我们将尽快为您发货')
  },
  //确认收货
  _trueorder(e){
    var that = this;
    Request.TrueOrder(e.currentTarget.dataset.id,(res)=>{
      if (res.data.isOK) {
        this.setData({
          'pagedata.pageNo': 0,
        })
        that._ajaxdata(2);
      }
    })
  },
  //订单详情
  _godetail(e){
    wx.navigateTo({
      url: '/pages/my/orderdetail/orderdetail?id='+e.currentTarget.dataset.id,
    })
  },
  _ajaxdata(num) {
    if (num == 2) {
      this.data.shopdatalist = [];
    }
    Request.OrderList(this.data.pagedata, (res) => {
      wx.stopPullDownRefresh()
      if (res.data.isOK) {
        if (res.data.data != null && res.data.data.length > 0) {
          this.setData({
            shopdatalist: this.data.shopdatalist.concat(res.data.data),
            'pagedata.pageNo': this.data.pagedata.pageNo
          })
        } else {
          if (num == 1 && this.data.pagedata.pageNo != 0) {
            this.data.pagedata.pageNo--
            this.setData({
              shopdatalist: this.data.shopdatalist,
              'pagedata': this.data.pagedata
            })
          }else{
            this.setData({
              shopdatalist: this.data.shopdatalist
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