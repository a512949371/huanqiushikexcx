// pages/my/transferaccounts/transferaccounts.js
import Request from '../../../jsondata/request.js';
import Common from '../../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    updata:{
      phone:'',
      price:'',
      twoPwd:''
    },
    isclick:true
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
  _inputdata(e){
    switch(e.currentTarget.dataset.num){
      case '1':
        this.setData({
          'updata.phone':e.detail.value
        })
        break;
      case '2':
        this.setData({
          'updata.price': e.detail.value
        })
        break;
      case '3':
        this.setData({
          'updata.twoPwd': e.detail.value
        })
        break;
    }
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
    console.log('da', data)
    if ((/^1[3456789]\d{9}$/.test(data))) {
      return true
    } else {
      return false
    }
  },
  _save(){
    console.log(this.data.updata)
    if(this.data.updata.phone!=''){
      if (!this._phonetf(this.data.updata.phone)){
        Common.Toast('请输入正确的收款人账户');
        return
      }
    }else{
      Common.Toast('收款人账户不能为空');
      return
    }
    if (this.data.updata.price!=''){
      if (isNaN(Number(this.data.updata.price))) {
        Common.Toast('输入金额格式不正确');
        return
      }
    }else{
      Common.Toast('转入金额不能为空');
      return
    }
    if (this.data.updata.twoPwd==''){
      Common.Toast('支付密码不能为空');
      return
    }
    if(this.data.isclick){
      Request.TransferConfirm(this.data.updata, (res) => {
        if(res.data.isOK){
          Common.Toast('转入成功');
          setTimeout(()=>{
            wx.switchTab({
              url: '/pages/my/my'
            })
          },1000)
        }else{
          console.log('err',res)
          Common.Toast(res.data.msg);
        }
      })
    }else{
      Common.Toast('请勿连续点击');
    }
    
  }
})