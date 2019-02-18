// pages/login/login.js
import WxValidate from '../../utils/WxValidate.js';
import Request from '../../jsondata/request.js';
import Common from '../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitdata: {
      phone: '',
      sms: '',
      recommendphone: '',
      pwd: '',
      repeatpwd: ''
    },
    phone: '',
    isrule: false,
    times: 60,
    smstip: '发送验证码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()
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
  //密码验证有无特殊字符
  _pwdfun(data) {
    const reg = /[0-9a-zA-Z]/i;
    const pwd = data;
    for (let i = 0; i < pwd.length; i++) {
      if (!reg.test(pwd[i])) {
        return true
      }
    }
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
  _sendsms() {
    if (this.data.times == 60) {
      this.data.times--
      if (this._phonetf()) {
        this._time()
        Request.EditPwdCode(this.data.phone, (res) => {

        })
      } else {
        this.showModal({ msg: '请输入正确的手机号' })
      }
    }
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
        rangelength: [6, 6]
      },
      pwd: {
        required: true,
        rangelength: [6, 20]
      },
      repeatpwd: {
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
      pwd: {
        required: '请输入密码',
        rangelength: '请输入正确的密码'
      },
      repeatpwd: {
        required: '请再次输入密码',
        rangelength: '请输入正确的密码',
        equalTo: "请输入和上一次一样的密码"
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  //报错 
  showModal(error) {
    wx.showToast({
      title: error.msg,
      icon: 'none'
    })
  },
  //密码验证有无特殊字符
  _pwdfun(data) {
    const reg = /[0-9a-zA-Z]/i;
    const pwd = data;
    for (let i = 0; i < pwd.length; i++) {
      if (!reg.test(pwd[i])) {
        return true
      }
    }
  },
  //计时器
  _time() {
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
    this.setData({
      phone: e.detail.value
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
  _sendsms() {
    if (this.data.times == 60) {
      if (this._phonetf()) {
        this._time()
      } else {
        this.showModal({ msg: '请输入正确的手机号' })
      }
    }
  },
  _login(e) {
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      console.log(error)
      this.showModal(error)
      return false
    }
    if (e.detail.value.pwd != '') {
      if (this._pwdfun(e.detail.value.pwd)) {
        this.showModal({ msg: '请输入正确的密码' })
        return
      }
    }
    let data = {
      code: params.sms,
      password: params.pwd,
    }
    Request.EditPwd(data,(res)=>{
      if(res.data.isOK){
        Common.Toast('修改成功')
        setTimeout(()=>{
          wx.switchTab({
            url: '/pages/my/my',
          })
        },1000)
      }else{
        Common.Toast(res.data.msg)
      }
    })
    console.log("验证通过,执行ajax事件")
  }
})