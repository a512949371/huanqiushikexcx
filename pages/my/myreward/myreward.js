// pages/my/myreward/myreward.js
import Request from '../../../jsondata/request.js';
import Common from '../../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navindex:1,
    testdata:[{
      name:'张三',
      phone:'15288151662'
    },
      {
        name: '张三',
        phone: '15288151662'
      },
      {
        name: '张三',
        phone: '15288151662'
      },
      {
        name: '张三',
        phone: '15288151662'
      },
      {
        name: '张三',
        phone: '15288151662'
      }],
      pagedata:{
        pageNo:1,
        pageSize:10,
        type:0
      },
    shopdata:'',
    shopdatalist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.testdata = this.data.testdata.map(function(item){
      item.phone=item.phone.replace(item.phone.substring(3, 7), '****')
       return item
    })
    this.setData({
      testdata: this.data.testdata
    })
    console.log(this.data.testdata)
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
    this._ajaxdata(2)
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
    this.setData({
      'pagedata.pageNo': 1
    })
    this._ajaxdata(2)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.pagedata.pageNo++
    this.setData({
      'pagedata.pageNo': this.data.pagedata.pageNo
    })
    this._ajaxdata(1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //选择类型
  _changenav(e){
    this.setData({
      navindex:e.currentTarget.dataset.type,
      'pagedata.type': e.currentTarget.dataset.type-1,
      'pagedata.pageNo':1
    })
    this._ajaxdata(2)
  },
  _ajaxdata(num) {
    if (num == 2) {
      this.data.shopdatalist = [];
    }
    Request.SelectBonus(this.data.pagedata, (res) => {
      wx.stopPullDownRefresh()
      if (res.data.isOK) {
        this.setData({
          shopdata: res.data.data
        })
        let arraydata=''
        switch (this.data.pagedata.type){
          case 0:
            arraydata = res.data.data.shareBonusDTOS||''
            if (arraydata != '' && arraydata.length>0){
              arraydata = arraydata.map((item) => {
                if (item.phone != null && item.phone != '') {
                  item.phone = item.phone.replace(item.phone.substring(3, 7), '****')
                }
                return item
              })
            }
            
            break;
          case 1:
            arraydata = res.data.data.accountOutRewards||''
            if (arraydata != '' && arraydata.length > 0) {
            arraydata = arraydata.map((item) => {
              if (item.accountNo != null && item.accountNo != '') {
                item.accountNo = item.accountNo.replace(item.accountNo.substring(3, 7), '****')
              }
              return item
            })
            }
            break;
          case 2:
            arraydata = res.data.data.accountOutRewards||''
            if (arraydata != '' && arraydata.length > 0) {
              arraydata = arraydata.map((item) => {
                if (item.accountNo != null && item.accountNo != '') {
                  item.accountNo = item.accountNo.replace(item.accountNo.substring(3, 7), '****')
                }
                return item
              })
            }
            break;

        }
        if (arraydata != '' && arraydata.length > 0) {
          this.setData({
            shopdatalist: this.data.shopdatalist.concat(arraydata),
            'pagedata.pageNo': this.data.pagedata.pageNo
          })
        } else {
          if (num == 1 && this.data.pagedata.pageNo != 1) {
            this.data.pagedata.pageNo--
            this.setData({
              shopdatalist: this.data.shopdatalist,
              'pagedata': this.data.pagedata
            })
          } else {
            this.setData({
              shopdatalist: this.data.shopdatalist
            })
          }
        }
        console.log("data", this.data.shopdatalist)
      } else {
        console.log("err", res)
      }
    })
  },
})