// pages/my/banklist/banklist.js
import Request from '../../../jsondata/request.js';
import Common from '../../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagedata: {
      pageNo: 1,
      pageSize: 10
    },
    shopdatalist: [],
    source: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      source: options.source || ''
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
  _createbank(){
    wx.navigateTo({
      url: '/pages/my/createbank/createbank?type=1',
    })
  },
  _editbank(e){
    wx.navigateTo({
      url: '/pages/my/editbank/editbank?id=' + e.currentTarget.dataset.id + '&sign=' + e.currentTarget.dataset.sign,
    })
  },
  _deletebank(e){
    var that=this
    wx.showModal({
      title: '提示',
      content: '确定删除该账号?',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          Request.DeleteWithdraw(e.currentTarget.dataset.id, (res) => {
            if (res.data.isOK) {
              Common.Toast('删除成功')
              that.setData({
                'pagedata.pageNo': 1
              })
              that._ajaxdata(2)
            } else {
              console.log('err', res)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  changeadd(e) {
    if (this.data.source != '') {
      let data = ''
      this.data.shopdatalist.forEach((item, i) => {
        console.log(i)
        if (e.currentTarget.dataset.num == i) {
          item.bankNo = item.bankNo.slice(-4)
          data = item
        }
        console.log(e.currentTarget.dataset.num, i, data)
      })
      const pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
      const prevPage = pages[pages.length - Number(this.data.source) - 1];
      prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
        bankinfo: data,
      })
      console.log(typeof (this.data.source))
      wx.navigateBack({
        delta: Number(this.data.source)
      })
    }
  },
  _ajaxdata(num) {
    if (num == 2) {
      this.data.shopdatalist = [];
    }
    Request.WithdeawList(this.data.pagedata, (res) => {
      wx.stopPullDownRefresh()
      if (res.data.isOK) {
        if (res.data.data != null && res.data.data.length > 0) {
          res.data.data = res.data.data.map((item)=>{
            if(item.sign===0){
              item.bankNo = item.bankNo.slice(-4)
            }else{
              item.bankNo = item.bankNo.slice(0, 3) + '****' + item.bankNo.slice(-4)
            }
            return item
          })
          this.setData({
            shopdatalist: this.data.shopdatalist.concat(res.data.data),
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
        console.log(this.data.shopdatalist)
      } else {
        console.log("err", res)
      }
    })
  },
})