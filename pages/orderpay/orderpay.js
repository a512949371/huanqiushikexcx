// pages/orderpay/orderpay
import Request from '../../jsondata/request.js';
import Common from '../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    shopdetail: '',
    buynum: 1,
    toprice: 0,
    desc: '',
    ischeck: 1,
    isclick: true,
    isshowpwdbox:true,
    pwd:'',
    address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    Request.Createshoporder(this.data.id, (res) => {
      console.log('add', this.data.address)
      if (res.data.isOK) {
        this.setData({
          shopdetail: res.data.data,
          address: this.data.address||res.data.data.address,
          toprice: res.data.data.price * this.data.buynum,
          ischeck: res.data.data.wxPay ? '1' : '2'
        })
        if (this.data.address != '' && this.data.address!=null){
          this.setData({
            'shopdetail.hasAddress':true
          })
        }
      } else {

      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  _goaddress() {
    wx.navigateTo({
      url: '/pages/my/myaddress/myaddress?source=1',
    })
  },
  _changepay(e) {
    this.setData({
      ischeck: e.currentTarget.dataset.num
    })
  },
  _reduce() {
    let price = this.data.shopdetail.price
    if (this.data.buynum > 1) {
      this.data.buynum--
    } else {
      Common.Toast('最小购买单数为一单')
    }
    this.setData({
      buynum: this.data.buynum,
      toprice: this.data.buynum * price
    })
  },
  _addnum() {
    let price = this.data.shopdetail.price
    if (this.data.buynum < this.data.shopdetail.productNum) {
      this.data.buynum++
    } else {
      Common.Toast('最大购买单数为' + this.data.shopdetail.productNum + '单')
    }
    this.setData({
      buynum: this.data.buynum,
      toprice: this.data.buynum * price
    })
  },
  _inputdata(e) {
    this.setData({
      desc: e.detail.value
    })
  },
  _save() {
    if (this.data.shopdetail.hasAddress) {
      if (this.data.isclick) {
        this.setData({
          isclick: false
        })
        if (this.data.ischeck==2){
          this.setData({
            isshowpwdbox:false
          })
        }else{
          var postdata = {
            payWay: 'wx' ,
            addressId: this.data.address.id,
            message: this.data.desc,
            goods: [{
              goodsId: this.data.shopdetail.id,
              number: this.data.buynum
            }]
          }
          console.log('postdatawx', postdata)
          Request.SubmitOrder(postdata, (res) => {
            this.setData({
              isclick: true
            })
            if (res.data.isOK) {
                Request.PayOrder({
                  orderId: res.data.data
                }, (res) => {

                })
            } else {
              console.log("err", res)
              Common.Toast(res.data.msg)
            }
          })
        }
        
      } else {
        Common.Toast('请勿连续点击')
      }
    } else {
      Common.Toast('请先选择收货地址')
    }

    console.log('da', postdata)
  },
  closepwd(e){
    console.log('2e',e)
    if(e.detail.type==1){
      this.setData({
        isshowpwdbox: true,
        isclick: true,
        pwd:''
      })
    }else{
      Request.Pwdtf(e.detail.pwd,(res)=>{
        if(res.data.isOK){
          this.setData({
            isshowpwdbox: true
          })
          var postdata = {
            payWay:'jf',
            addressId: this.data.address.id,
            message: this.data.desc,
            goods: [{
              goodsId: this.data.shopdetail.id,
              number: this.data.buynum
            }]
          }
          console.log('postdata', postdata)
          Request.SubmitOrder(postdata, (res) => {
            this.setData({
              isclick: true
            })
            if (res.data.isOK) {
                Common.Toast('支付成功')
                setTimeout(() => {
                  wx.redirectTo({
                    url: '/pages/my/orderdetail/orderdetail?id=' + res.data.data.orderID,
                  })
                }, 1000)
            } else {
              console.log("err", res)
                Common.Toast(res.data.msg)
            }
          })
        }else{
            Common.Toast(res.data.msg)
          
        }
      })
    }  
  }
})