// pages/my/takeoutmoney/takeoutmoney.js
import Request from '../../../jsondata/request.js';
import Common from '../../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:'',
    money:0,
    fee:'',
    feetype:'',
    amount:'',
    isclick:true,
    bankinfo:''
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
    Request.GetWithdraw('',(res)=>{
      console.log('bankinfo', this.data.bankinfo)
      if(res.data.isOK){
        if (res.data.data.withdrawDTO&&res.data.data.withdrawDTO.bankNo != null && res.data.data.withdrawDTO.bankNo !=''){
          res.data.data.withdrawDTO.bankNo = res.data.data.withdrawDTO.bankNo.slice(-4)
        }
        this.setData({
          detail:res.data.data,
          bankinfo: this.data.bankinfo || res.data.data.withdrawDTO,
          fee: res.data.data.fee,
          feetype: res.data.data.type,
        })
        if (this.data.bankinfo != '' && this.data.bankinfo!=null){
          this.setData({
            'detail.hasWithdrawNo':true
          })
        }
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
  _input(e) {
    console.log(isNaN(Number(e.detail.value)), Number(e.detail.value))
    if (!isNaN(Number(e.detail.value))) {
      if(this.data.feetype!=1){
        this.setData({
          money: (e.detail.value-this.data.fee).toFixed(2)
        })
      }else{
        this.setData({
          money: (e.detail.value-e.detail.value * (this.data.fee/100)).toFixed(2)
        })
      }
      this.setData({
        amount: e.detail.value
      })
    } else {
      Common.Toast("请输入正确数值")
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
  _gobanklist(){
    wx.navigateTo({
      url:'/pages/my/banklist/banklist?source=1'
    })
  },
  _gocreatebank(){
    wx.navigateTo({
      url: '/pages/my/createbank/createbank?type=2'
    })
  },
  _save(e){
    if (this.data.detail.hasWithdrawNo){
      let data={
        amount: this.data.amount,
        fee: this.data.fee,
        type:this.data.feetype,
        id: this.data.bankinfo.id
      }
      console.log(Number(data.amount), Number(this.data.detail.price))
      if (Number(data.amount) <= Number(this.data.detail.price)){
        if (this.data.isclick){
          this.setData({
            isclick:false
          })
          Request.WithdrawConfirm(data, (res) => {
            this.setData({
              isclick: true
            })
            if (res.data.isOK) {
              Common.Toast('提现申请成功')
              setTimeout(() => {
                this.setData({
                  amount: '',
                  money:''
                })
                this.onShow()
              }, 1000)
            }else{
              Common.Toast(res.data.msg)
            }
          })
        }else{
          Common.Toast('请勿连续提交')
        }
        
      }else{
        Common.Toast('可提现金额不足,请重新输入提现金额')
      }
      
    }else{
      Common.Toast('请先选择提现账号')
    }
  }
})