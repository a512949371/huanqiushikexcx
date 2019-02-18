// pages/my/myinfo/myinfo.js
import Request from '../../../jsondata/request.js';
import Common from '../../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:'',
    updata:{
      idCard:'',
      realName:''
    }
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
    Request.Getuesrinfo('',(res)=>{
      if(res.data.isOK){
        this.setData({
          info:res.data.data,
          'updata.realName': res.data.data.realName||'',
          'updata.idCard': res.data.data.idCard || '',
        })
      }else{
        console.log('err',res)
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
  _inputinfo(e) {
    switch (e.currentTarget.dataset.num) {
      case '1':
        this.setData({
          'updata.realName': e.detail.value
        })
        break;
      case '2':
        this.setData({
          'updata.idCard': e.detail.value
        })
        break;
    }
  },
  //验证有无特殊字符
  _pwdfun(data) {
    const reg = /[0-9a-zA-Z]/i;
    const pwd = data;
    for (let i = 0; i < pwd.length; i++) {
      if (!reg.test(pwd[i])) {
        return false
      }
    }
    return true
  },
  _saveadd() {
    if (this.data.updata.realName == '') {
      Common.Toast('请输入真实姓名')
      return
    } else {
      let reg = /^[\u4e00-\u9fa5]+$/i;
      let iszn = reg.test(this.data.updata.realName) && this.data.updata.realName.length >= 2
      let iscn = this._pwdfun(this.data.updata.realName) && this.data.updata.realName.length >= 4
      console.log(iszn, iscn, this._pwdfun(this.data.updata.realName))
      if (!iszn && !iscn) {
        Common.Toast('输入的姓名格式不正确')
        return
      }
    }
    if (this.data.updata.idCard == '') {
      Common.Toast('请输入身份证号码')
      return
    } else {
      if (Common.idcardtf(this.data.updata.idCard)) {
        Common.Toast('输入的身份证号码格式不正确')
        return
      }
    }
    Request.Setuesrinfo(this.data.updata, (res) => {
      if (res.data.isOK) {
        Common.Toast('编辑个人信息成功')
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/my/my',
          })
        }, 1000)
      } else {
        console.log('err', res)
      }
    })
  }
})