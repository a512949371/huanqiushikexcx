// pages/register/register.js
import Request from '../../jsondata/request.js';
import Common from '../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    sms:'',
    times: 60,
    smstip: '发送验证码',
    source:0,
    shopid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      source: options.source,
      shopid:options.shopid||''
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
    if (wx.getStorageSync('isregister')){
      
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
  //报错 
  showModal(error) {
    wx.showToast({
      title: error.msg,
      icon: 'none'
    })
  },
  //计时器
  _time() {
    var that=this;
    const time = setInterval(() => {
      if (this.data.times > 0) {
        this.data.times--;
        this.setData({
          times: this.data.times,
          smstip: this.data.times + 's'
        })
      } else {
        clearInterval(time)
        this.setData({
          times: 60,
          smstip: '发送验证码'
        })
      }
    }, 1000)
  },
  _inputphone(e) {
    switch (e.currentTarget.dataset.inputid){
      case '1':
        this.setData({
          phone: e.detail.value
        })
        break;
      case '2':
        this.setData({
          sms: e.detail.value
        })
        break;
        default:
          break;
    }
  },
  // 手机号判断
  _phonetf(data) {
    console.log(data,this.data.phone)
    if ((/^1[3456789]\d{9}$/.test(data))) {
      return true
    } else {
      return false
    }
  },
  //发送验证码
  _sendsms() {
    var that=this;
    if (this.data.times == 60) {
      if (this._phonetf(this.data.phone)) {
        let data = {
          phone: this.data.phone,
          scenes: '登录'
        }
        Request.GetSms(data, (res) => {
          if(res.data.isOK){
            Common.Toast('发送成功')
            that.data.times--
            that._time()
          }else{
            if (res.data.msg == '用户不存在') {
              setTimeout(() => {
                wx.showModal({
                  title: '提示',
                  content: '用户不存在,请注册用户',
                  confirmText: '注册',
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: '/pages/register/register?source=3',
                      })
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
              }, 500)
            } else {
              setTimeout(() => {
                Common.Toast(res.data.msg)
              }, 500)
            }
          }
        })
      } else {
        this.showModal({ msg: '请输入正确的手机号' })
      }
    }
  },
  _login(){
    if(this.data.phone!=''){
      if (!this._phonetf(this.data.phone)){
        Common.Toast('请输入正确的手机号')
        return
      }
    }else{
      Common.Toast('请输入手机号')
      return
    }
    if(this.data.sms!=''){
      // if(this.data.sms.length!=6){
      //   Common.Toast('请输入')
      //   return
      // }
    }else{
      Common.Toast('请输入验证码')
      return
    }
    let data={
      phone:this.data.phone,
      code:this.data.sms,
      token:wx.getStorageSync('token')
    }
    Request.VipLogin(data,(res)=>{
      if(res.data.isOK){
        wx.setStorageSync('token', res.data.data.token)
        wx.setStorageSync('isregister', true)
        wx.navigateBack({
          data:1
        })
      }else{
        if(res.data.msg=='用户不存在'){
          setTimeout(() => {
            wx.showModal({
              title: '提示',
              content: '用户不存在,请注册用户',
              confirmText:'注册',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/register/register?source=3',
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }, 500)
        }else{
          setTimeout(()=>{
            Common.Toast(res.data.msg)
          },500)
        }
        
      }
    })
  },
  //跳转注册页面
  _goregsiter(){
    wx.navigateTo({
      url: '/pages/register/register?source=' + this.data.source + '&shopid=' + this.data.shopid,
    })
  }
})