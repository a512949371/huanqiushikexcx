// pages/login/login.js
import Request from '../../jsondata/request.js';
import Common from '../../utils/common.js';
import WxValidate from '../../utils/WxValidate.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    isrule:false,
    isauthorization:false,
    times:60,
    issms:true,
    smstip:'发送验证码',
    nick:'',
    headpic:'',
    num:0,
    source:0,
    shopid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    this.setData({
      source: options.source,
      shopid: options.shopid
    })
    this.initValidate()
    Common.isGrantAuthorization().then((res) => {
        this.setData({
          isauthorization:res
        })
        if(res){
          wx.getUserInfo({
            success(res){
              var userData = JSON.parse(res.rawData)
              that.setData({
                nick: userData.nickName,
                headpic: userData.avatarUrl
              })
            }
          })
        }
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
    Request.Login().then((res) => {

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
  //验证函数
  initValidate() {
    const rules = {
      phone: {
        required: true,
        tel: true,
      },
      sms: {
        required: true,
        rangelength: [5, 5]
      },
      recommendphone:{
        tel: true,
      },
      pwd:{
        required: true,
        rangelength: [6, 20]
      },
      repeatpwd:{
        required: true,
        rangelength: [6, 20],
        equalTo: 'pwd'
      }
    }
    const messages = {
      phone: {
        required: '请输入手机号',
        tel: '请输入正确的手机号'
      },
      sms: {
        required: '请输入验证码',
        rangelength: '请输入正确的验证码'
      },
      recommendphone: {
        tel: '请输入正确的推荐人手机号'
      },
      pwd:{
        required: '请输入密码',
        rangelength: '请输入正确的密码'
      },
      repeatpwd:{
        required: '请再次输入密码',
        rangelength: '请输入正确的密码',
        equalTo:"请输入和上一次一样的密码"
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  //报错 
  showModal(error) {
    wx.showToast({
      title: error.msg,
      icon:'none'
    })
  },
  //密码验证有无特殊字符
  _pwdfun(data){
    const reg = /[0-9a-zA-Z]/i;
    const pwd = data;
    for (let i = 0; i < pwd.length; i++) {
      if (!reg.test(pwd[i])) {
        return true
      }
    }
  },
  //计时器
  _time(){
    const time = setInterval(()=>{
      if (this.data.times>0){
        this.data.times--;
        this.setData({
          times: this.data.times,
          smstip: this.data.times+'s'
        })
      }else{
        clearInterval(time)
        this.setData({
          times: 60,
          smstip:'发送验证码'
        })
      }
    },1000)
  },
  _inputphone(e){
    this.setData({
      phone:e.detail.value
    })
  },
  // 手机号判断
  _phonetf() {
    console.log(this.data.phone)
    if ((/^1[3456789]\d{9}$/.test(this.data.phone))) {
      return true
    } else {
      return false
    }
  },
  //发送验证码
  _sendsms(){
    var that=this
    if(this.data.times==60){
      console.log('1')
      if (this._phonetf()){
        let data = {
          phone: this.data.phone,
          scenes: '注册'
        }
        Request.GetSms(data,(res)=>{
          if(res.data.isOK){
            Common.Toast('发送成功')
            that.data.times--
            that._time()
          }else{
            Common.Toast(res.data.msg)
          }
        })
      }else{
        this.showModal({ msg: '请输入正确的手机号' })
      }  
    }
  },
  //勾选规则
  _checkrule(){
    this.setData({
      isrule: !this.data.isrule
    })
  },
  _login(e){
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    if (e.detail.value.pwd!=''){
      if (this._pwdfun(e.detail.value.pwd)){
        this.showModal({msg:'请输入正确的密码'})
        return
      }
    }
    if (!this.data.isrule){
      this.showModal({ msg: '请同意用户服务协议' })
      return
    }
    let data={
      phone: params.phone,
      code: params.sms,
      referrerPhone: params.recommendphone,
      pwd: params.pwd,
      headImg: this.data.headpic,
      nickname:this.data.nick,
      token: wx.getStorageSync('token')
    }
    
    Request.Register(data,(res)=>{
      if(res.data.isOK){
        wx.setStorageSync('isregister', true)
        wx.setStorageSync('token', res.data.data.token)
        Common.Toast('注册成功');
        setTimeout(() => {
          if (this.data.source == 1) {
            wx.switchTab({
              url: '/pages/my/my'
            })
          } else if (this.data.source == 2) {
            wx.switchTab({
              url: '/pages/world/world'
            })
          } else if (this.data.source == 3) {
            wx.switchTab({
              url: '/pages/index/index'
            })
          } else {
            wx.redirectTo({
              url: '/pages/shop/detail/detail?id=' + this.data.shopid,
            })
          }
        }, 1000)
        console.log(Number(2 + this.data.num))
      }else{
        console.log("err", res, res.data.code == '00100001')
        if (res.data.code =='00100001'){
          wx.removeStorageSync('token')
          Request.Login().then(()=>{
            this._login(e)
          })
        } else if (res.data.code == '00100006'){
          Common.Toast(res.data.msg)
        }
      }
    })   
  },
  bindGetUserInfo: function (e) {
    var that = this;
    var userData = JSON.parse(e.detail.rawData)
    this.setData({
      nick: userData.nickName,
      headpic: userData.avatarUrl,
      isauthorization:true,
      num:1
    })
  },
})