// pages/my/editaddress/editaddress.js
import Request from '../../../jsondata/request.js';
import Common from '../../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    info: '',
    updata: {
      phone: '',
      realName: '',
      address: '',
      id:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      'updata.id': options.id,
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
    Request.Getaddressinfo(this.data.id,(res)=>{
      if(res.data.isOK){
        this.setData({
          info:res.data.data,
          'updata.realName': res.data.data.realName,
          'updata.phone': res.data.data.phone,
          'updata.address': res.data.data.address,
        })
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
  // 手机号判断
  _phonetf() {
    console.log(this.data.updata.phone)
    if ((/^1[3456789]\d{9}$/.test(this.data.updata.phone))) {
      return true
    } else {
      return false
    }
  },
  //验证地址有无特殊字符
  _checks(newName) {
    var regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
      regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
    if (regEn.test(newName) || regCn.test(newName)) {
      return true;
    }
    return false;
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
          'updata.phone': e.detail.value
        })
        break;
      case '3':
        this.setData({
          'updata.address': e.detail.value
        })
        break;
    }
  },
  _saveadd() {
    if (this.data.updata.realName == '') {
      Common.Toast('请输入收货人姓名')
      return
    } else {
      let reg = /^[\u4e00-\u9fa5]+$/i;
      let iszn = reg.test(this.data.updata.realName) && this.data.updata.realName.length >= 2
      let iscn = this._checks(this.data.updata.realName) && this.data.updata.realName.length >= 4
      console.log(iszn, iscn, this._checks(this.data.updata.realName))
      if (!iszn && iscn) {
        Common.Toast('请输入正确的收货人姓名')
        return
      }
    }
    if (this.data.updata.phone == '') {
      Common.Toast('请输入联系方式')
      return
    } else {
      if (!this._phonetf()) {
        Common.Toast('请输入正确的联系方式')
      }
    }
    if (this.data.updata.address == '') {
      Common.Toast('请输入收货地址')
      return
    } else {
      if (this._checks(this.data.updata.address)) {
        Common.Toast('收货地址不能带有特殊字符')
        return
      }
    }
    Request.EditAddressList(this.data.updata, (res) => {
      if (res.data.isOK) {
        Common.Toast('编辑地址成功')
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/my/myaddress/myaddress',
          })
        }, 1000)
      } else {
        console.log('err', res)
      }
    })
  }
})