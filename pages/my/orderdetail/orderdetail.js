// pages/my/orderdetail/orderdetail.js
import Request from '../../../jsondata/request.js';
import Common from '../../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderstatus:1,
    imgdata:[{
      img:'/images/tu-1.png',
      desc:"等待付款"
    },
    {
      img: '/images/tu-2.png',
      desc: "等待发货"
    },
    {
      img: '/images/tu-3.png',
      desc: "等待收货"
      },
      {
        img: '/images/tu-4.png',
        desc: "已收货"
      },
      {
        img: '/images/tu-5.png',
        desc: "已取消"
      }],
    id:'',
    detail:'',
    isshowpwdbox: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
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
    Request.OrderDetail(this.data.id,(res)=>{
      if(res.data.isOK){
        switch (res.data.data.orderStatus){
          case 101:
            this.data.orderstatus=1
          break;
          case 102:
            this.data.orderstatus = 5
            break;
          case 103:
            this.data.orderstatus = 5
            break;
          case 201:
            this.data.orderstatus = 2
            break;
          case 301:
            this.data.orderstatus = 3
            break;
          case 401:
            this.data.orderstatus = 4
            break;
          default:
            break;
        }
        this.setData({
          detail:res.data.data,
          orderstatus: this.data.orderstatus
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
  //催单发货
  _calldelivergood() {
    Common.Toast('催单成功，我们将尽快为您发货')
  },
  _wxpay(e){
    let shop =[]
    this.data.detail.goodsList.forEach((item)=>{
      let data={
        goodsId: item.id,
        number:item.number,
      }
      shop.push(data)
    })
    var postdata = {
      payWay: 'wx',
      addressId: this.data.detail.address,
      goods: shop
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
  },
  _payjf(e){
    this.setData({
      isshowpwdbox: false
    })
  },
  closepwd(e) {
    console.log('2e', e)
    if (e.detail.type == 1) {
      this.setData({
        isshowpwdbox: true,
        isclick: true,
        pwd: ''
      })
    } else {
      Request.Pwdtf(e.detail.pwd, (res) => {
        if (res.data.isOK) {
          this.setData({
            isshowpwdbox: true
          })
          Request.Jfpay({ orderId:this.data.detail.id}, (res) => {
            this.setData({
              isclick: true
            })
            if (res.data.isOK) {
              this.setData({
                isshowpwdbox: false
              })
              Common.Toast('支付成功')
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/my/myorder/myorder',
                })
              }, 1000)
            } else {
              console.log("err", res)
              setTimeout(() => {
                Common.Toast(res.data.msg)
              }, 500)
            }
          })
        } else {
          Common.Toast(res.data.msg)
        }
      })
    }
  }
})