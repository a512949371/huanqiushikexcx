// pages/my/my.js
import Common from '../../utils/common.js';
import Request from '../../jsondata/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menudata: [{
        menuname: '其他操作',
        menulist: [{
            imgurl: '../../images/icon_my7.png',
            name: '提现',
            id: 1
          },
          {
            imgurl: '../../images/icon_my8.png',
            name: '转账',
            id: 2
          },
          {
            imgurl: '../../images/icon_my9.png',
            name: '修改密码',
            id: 3
          },
          {
            imgurl: '../../images/icon_my10.png',
            name: '用户帮助',
            id: 4
          },
        ]
      },
      {
        menuname: '我的资产',
        menulist: [{
            imgurl: '../../images/icon_my11.png',
            name: '奖金明细',
            id: 5
          },
          {
            imgurl: '../../images/icon_my12.png',
            name: '财务明细',
            id: 6
          },
          {
            imgurl: '../../images/icon_my13.png',
            name: '提现记录',
            id: 7
          },
          {
            imgurl: '../../images/icon_my14.png',
            name: '转账记录',
            id: 8
          },
        ]
      }
    ],
    islogin: false,
    userdata: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
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
    var that = this
    Request.Login().then((res) => {
      console.log("?", res)
      if (res.success) {
        this.setData({
          islogin: wx.getStorageSync('isregister')
        })
        Request.UserInfo('', (res) => {
          if (res.data.isOK) {
            that.setData({
              userdata: res.data.data
            })
          }
        })
      }
    }).catch((res) => {
      console.log("??", res)
    })
    Common.isGrantAuthorization().then((res) => {

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
  _gobusiness(e) {
    if (this.data.islogin && e.currentTarget.dataset.id!=4){
    switch (e.currentTarget.dataset.id) {
      case 1:
        wx.navigateTo({
          url: '/pages/my/takeoutmoney/takeoutmoney',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '/pages/my/transferaccounts/transferaccounts',
        })
        break;
      case 3:
        wx.navigateTo({
          url: '/pages/editpwd/editpwd',
        })
        break;
      case 4:
        wx.navigateTo({
          url: '/pages/my/help/help',
        })
        break;
      case 5:
        wx.navigateTo({
          url: '/pages/my/myreward/myreward',
        })
        break;
      case 6:
        wx.navigateTo({
          url: '/pages/my/myfinance/myfinance',
        })
        break;
      case 7:
        wx.navigateTo({
          url: '/pages/my/takeawaymoneylist/takeawaymoneylist',
        })
        break;
      case 8:
        wx.navigateTo({
          url: '/pages/my/transferaccountslist/transferaccountslist',
        })
        break;
    }
    } else if (e.currentTarget.dataset.id == 4){
      wx.navigateTo({
        url: '/pages/my/help/help',
      })
    }else{
      Common.ShowModel('您还没有登录','/pages/login/login?source=1','去登录')
    }
  },
  _gologin() {
    wx.navigateTo({
      url: '/pages/login/login?source=1',
    })
  },
  _gomyinfo() {
    if(this.data.islogin){
      wx.navigateTo({
        url: '/pages/my/myinfo/myinfo',
      })
    }else{
      Common.ShowModel('您还没有登录', '/pages/login/login?source=1', '去登录')
    }
    
  },
  _gomynew() {
    if (this.data.islogin) {
      wx.navigateTo({
        url: '/pages/my/messagecenter/messagecenter',
      })
    } else {
      Common.ShowModel('您还没有登录', '/pages/login/login?source=1', '去登录')
    }
    
  },
  _gomyaddress() {
    if (this.data.islogin) {
      wx.navigateTo({
        url: '/pages/my/myaddress/myaddress',
      })
    } else {
      Common.ShowModel('您还没有登录', '/pages/login/login?source=1', '去登录')
    }
    
  },
  _goorder(e) {
    if (this.data.islogin) {
      wx.navigateTo({
        url: '/pages/my/myorder/myorder?type=' + e.currentTarget.dataset.type,
      })
    } else {
      Common.ShowModel('您还没有登录', '/pages/login/login?source=1', '去登录')
    }
    
  }
})