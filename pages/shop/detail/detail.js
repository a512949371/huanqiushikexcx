// pages/shop/detail/detail.js
import WxParse from '../../../wxParse/wxParse.js';
import Request from '../../../jsondata/request.js';
import Common from '../../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    time:'',
    duration:100,
    shopdata:'',
    scrolldata:[],
    isauthorization:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    Common.isGrantAuthorization().then((res) => {
      console.log(res)
      this.setData({
        isauthorization: res,
      })
    })
    this._randomphone()
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
    Request.ShopDetail(this.data.id,(res)=>{
      if(res.data.isOK){
        this.setData({
          shopdata:res.data.data
        })
        WxParse.wxParse('desc', 'html', res.data.data.proDetails, this, 5)
      }else{
        console.log("err",res)
      }
    })
    this.data.time= setInterval(()=>{
      this._randomphone()
    },19000)
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
    clearInterval(this.data.time)
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
  onShareAppMessage: function (res) {
      return {
        title: wx.getStorageSync('nick') + '邀请您参与全球公排，零门槛，低投入，消费投资两不误',
        path: '/pages/shop/detail/detail?id=' + this.data.id
      }
  },
  _gobefindex(e){
    wx.showModal({
      title: '提示',
      content: '您还没有授权或授权已过期',
      confirmText: '去授权',
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/befindex/befindex?url=2&shopid=' + e.currentTarget.dataset.id,
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  _gohome(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  _save(e){
    if (wx.getStorageSync('isregister')){
      wx.navigateTo({
        url: '/pages/orderpay/orderpay?id=' + e.currentTarget.dataset.id,
      })
    }else{
      Common.ShowModel('您还没有登录，现在去登录吗?', '/pages/login/login?source=0&shopid=' + e.currentTarget.dataset.id,'确定')
    }
    
  },
  _randomphone(){
    let start=[131,132,133,134,135,136,137,138,139,145,147,150,151,152,153,155,156,157,158,159,173,173,177,178,180,181,182,183]
    let data =[];
    for(let i=0;i<40;i++){
      let end = Math.floor(Math.random() * 10000);
      let err = end>1000?end:end+1000
      let phone = start[Math.floor(Math.random() * 28)] + '****' + err + '分享并已获得惊喜'
      data.push(phone)
    }
    this.setData({
      scrolldata: data
    }) 
  }
})