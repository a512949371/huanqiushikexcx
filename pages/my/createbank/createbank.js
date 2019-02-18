// pages/my/createbank/createbank.js
import Request from '../../../jsondata/request.js';
import Common from '../../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navindex:1,
    isshow:false,
    updatabank:{
      accountName:'',
      accountNo:'',
      sign:0,
    },
    updatazfb: {
      accountName: '支付宝账号',
      accountNo: '',
      sign: 1,
    },
    backnum:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      backnum:options.type||1
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
  //选择导航
  _changenav(e){
    switch (e.currentTarget.dataset.num){
      case '1':
        this.setData({
          isshow:false
        })
        break;
      case '2':
        this.setData({
          isshow: true
        })
        break;
    }
    this.setData({
      navindex:e.currentTarget.dataset.num,
    })
  },
  //是否带有特殊字符
  _checks(newName) {
    var regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
      regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
    if (regEn.test(newName) || regCn.test(newName)) {
      return true;
    }
    return false;
  },
  // 手机号判断
  _phonetf(data) {
    console.log('da',data)
    if ((/^1[3456789]\d{9}$/.test(data))) {
      return true
    } else {
      return false
    }
  },
  _inputdata(e){
    switch(e.currentTarget.dataset.num){
      case '1':
       this.setData({
         'updatabank.accountName':e.detail.value
       })
        break;
      case '2':
        this.setData({
          'updatabank.accountNo': e.detail.value
        })
        break;
      case '3':
        this.setData({
          'updatazfb.accountNo': e.detail.value
        })
        break;
      default:
        break;
    }
  },
  _save(e){
    var that=this;
    let data='';
    switch(e.currentTarget.dataset.sign){
      case '1':
        data=this.data.updatabank;
        if (data.accountName!=''){
          if (this._checks(data.accountName) || data.accountName.length > 60) {
            Common.Toast('请输入正确的银行名称');
            return
          }
        }else{
          Common.Toast('银行名称不能为空');
          return
        }
        
        if (data.accountNo != '') {
          if (data.accountNo.length>30){
            Common.Toast('请输入正确的银行卡号');
            return
          }
        }else{
          Common.Toast('银行卡号不能为空');
          return
        }
        break;
      case '2':
        data = this.data.updatazfb;
        if (!this._phonetf(data.accountNo)) {
          Common.Toast('请输入正确的支付宝账号');
          return
        }
        break;
      default:
        break;
    }
    Request.CreateWithdeaw(data,(res)=>{
      if(res.data.isOK){
        if(that.data.backnum==1){
          wx.redirectTo({
            url: '/pages/my/banklist/banklist?source=2',
          })
        }else{
          wx.redirectTo({
            url: '/pages/my/takeoutmoney/takeoutmoney',
          })
        }
        
      }else{
        console.log('err',res)
      }
    })
  }
})