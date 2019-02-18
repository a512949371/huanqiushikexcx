// pages/world/world.js
import Request from '../../jsondata/request.js';
import Common from '../../utils/common.js';
import FormatTime from '../../utils/util.js';
import Base64src from '../../utils/base64src.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navindex: 1,
    isshow: true,
    islogin: false,
    isadmin: false,
    pagedata: {
      pageNo: 1,
      pageSize: 10,
      status: 1
    },
    shopdata: '',
    shopdatalist: [],
    isauthorization: false,
    pageheight: '',
    qrcode: '',
    sharemode: [{
        shareicon: '/images/icon_wxfriend.png',
        sharedesc: '微信好友',
        sharetype: 1
      },
      {
        shareicon: '/images/icon_morefriend.png',
        sharedesc: '微信朋友圈',
        sharetype: 2
      },
      {
        shareicon: '/images/icon_dowload.png',
        sharedesc: '保存到本地',
        sharetype: 3
      }
    ],
    canvasbox: {
      top: 0,
      bottom: 0
    },
    openSet: false,
    shareImg: '',
    usewidth: 0,
    useheight: 0,
    nick: '',
    headpic: '',
    qrcode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        that.setData({
          'canvasbox.top': (res.screenHeight * (1 - 0.75)) / 2 + 'rpx',
          'canvasbox.bottom': (res.screenHeight * (1 - 0.75)) / 2 + 'rpx',
          usewidth: res.screenWidth - 90,
          useheight: (res.screenWidth - 90) * 1.2,
          pageheight: res.screenHeight
        })
      },
    })
    Common.isGrantAuthorization().then((res) => {
      console.log(res)
      this.setData({
        isauthorization: res,
      })
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
    var that = this
    Request.Login().then((res) => {
      console.log("?", res)
      if (res.success) {
        that.setData({
          islogin: wx.getStorageSync('isregister')
        })
        this._ajaxdata(2)
        Request.Qrcode('', (res) => {
          console.log('qrcoe', res)
          if (res.data.isOK) {
            let data = res.data.data
            wx.downloadFile({
              url: data.headImg,
              success(res) {
                that.setData({
                  headpic: res.tempFilePath,
                  nick: data.name,
                })
              }
            })
            Base64src(res.data.data.base64).then((res) => {
              that.setData({
                qrcode: res,
              })
            })
          }
        })
      }
    }).catch((res) => {
      console.log("??", res)
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
    this.setData({
      'pagedata.pageNo': 1
    })
    this._ajaxdata(2)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.data.pagedata.pageNo++;
    this.setData({
      'pagedata': this.data.pagedata
    })
    this._ajaxdata(1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: wx.getStorageSync('nick') + '邀请您参与全球时刻',
      path: '/pages/index/index',
      imageUrl: '/images/pic-share.png'
    }
  },
  //选择子账号类型
  _changenav(e) {
    this.setData({
      'pagedata.pageNo': 1,
      'pagedata.status': e.currentTarget.dataset.type,
      navindex: e.currentTarget.dataset.type,
    })
    this._ajaxdata(2)
  },
  _gologin() {
    wx.navigateTo({
      url: '/pages/login/login?source=2',
    })
  },
  _goshop() {
    wx.switchTab({
      url: '/pages/shop/shop',
    })
  },
  _goshare() {
    var that = this;
    this.setData({
      isshow: false
    })
    that.Createshare()
  },
  _closeshare() {
    this.setData({
      isshow: true
    })
  },
  //提现出局
  _gogetoutmoney(e) {
    wx.navigateTo({
      url: '/pages/outoffice/outoffice?id=' + e.currentTarget.dataset.id + '&groupid=' + e.currentTarget.dataset.groupid,
    })
  },
  bindGetUserInfo: function(e) {
    var that = this;
    var userData = JSON.parse(e.detail.rawData)
    this.setData({
      isauthorization: true,
    })
  },
  _ajaxdata(num) {
    if (num == 2) {
      this.setData({
        shopdatalist:[],
      })
    }
    Request.World(this.data.pagedata, (res) => {
      wx.stopPullDownRefresh()
      if (res.data.isOK) {
        this.setData({
          shopdata: res.data.data,
          isadmin: res.data.data.isVip
        })
        if (res.data.data.subList != null && res.data.data.subList.length > 0) {
          res.data.data.subList = res.data.data.subList.map((item) => {
            if (item.outgoingTime != null && item.outgoingTime != '') {
              item.outgoingTime = FormatTime.timeStampToTime(item.outgoingTime)
            }
            item.percentage = (item.percentage * 100).toFixed(0)
            return item
          })
          this.setData({
            shopdatalist: this.data.shopdatalist.concat(res.data.data.subList),
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
              shopdatalist: this.data.shopdatalist,
            })
          }
        }
        console.log('shopdatalist', this.data.shopdatalist)
      } else {
        console.log("err", res)
      }
    })
  },
  //关闭分享组件
  Closeshare(e) {
    console.log("e", e)
    this.setData({
      isshow: true
    })
  },
  Createshare() {
    console.log('2', this.data.nick, this.data.headpic, this.data.qrcode)
    var that = this;
    let width = that.data.usewidth;
    let height = that.data.useheight;
    console.log(that.data.usewidth, that.data.useheight)
    var context = wx.createCanvasContext('Share', this);
    // context.setFillStyle('#f00')
    // context.fillRect(0, 0, width, height)
    // context.fill();
    var path = "/images/share-bg.png";
    //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    //不知道是什么原因，手机环境能正常显示
    context.drawImage(path, 0, 0, width, height);
    // //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    var path2 = "/images/share.png";
    context.drawImage(path2, width * 0.0438, height * 0.044, width * 0.912, height * 0.431);
    var path3 = that.data.headpic;
    // context.drawImage(path3, width * 0.0438, height * 0.044, width * 0.912, height * 0.431);
    // //不知道是什么原因，手机环境能正常显示
    context.save(); // 保存当前context的状态
    context.arc(width * 0.48, height * 0.47, width * 0.11, 0, 2 * Math.PI);
    context.setLineWidth("10");
    context.setStrokeStyle('#fff');
    context.setFillStyle('#fff');
    context.fill()
    context.stroke()
    context.clip()
    context.drawImage(path3, width * 0.37, height * 0.38, width * 0.22, width * 0.22);
    context.restore()
    context.beginPath()
    var nick = that.data.nick;
    //绘制名字
    context.setFontSize(15);
    context.setFillStyle('#333333');
    context.setTextAlign('center');
    context.fillText(nick, width * 0.48, height * 0.625);
    context.stroke();
    //绘制修饰词
    context.beginPath()
    context.setFontSize(14);
    context.setFillStyle('#646464');
    context.setTextAlign('center');
    context.fillText("邀请您参与全球时刻", width * 0.48, height * 0.69);
    context.stroke();
    //绘制修饰线
    context.beginPath()
    context.setStrokeStyle('#999');
    context.moveTo(width * 0.088, height * 0.68)
    context.lineTo(width * 0.179, height * 0.68)
    context.moveTo(width * 0.789, height * 0.68)
    context.lineTo(width * 0.89, height * 0.68)
    context.stroke()
    //绘制二维码背景
    context.beginPath()
    context.drawImage('/images/qrcode-bg.png', width * 0.04, height * 0.72, width * 0.919, width * 0.31);
    //绘制二维码
    context.drawImage(that.data.qrcode, width * 0.123, height * 0.765, width * 0.2, width * 0.2);
    //绘制右下角文字
    context.beginPath()
    context.setFontSize(13);
    context.setFillStyle('#323232');
    context.setTextAlign('left');
    context.fillText("长按识别左侧二维码即可", width * 0.403, height * 0.83);
    context.fillText("参团获利", width * 0.403, height * 0.88);
    context.stroke();
    context.draw(false, function() {
      setTimeout(function() {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: that.width,
          height: that.height,
          destWidth: that.width,
          destHeight: that.height,
          canvasId: 'Share',
          success(res) {
            console.log("tempFilePath", res.tempFilePath)
            that.setData({
              shareImg: res.tempFilePath
            })
          },
          fail: function(res) {
            console.log("errtempFilePath", res)
          }
        }, that)
      }, 500)
    });
  },
  // 长按保存事件
  saveImg(e) {
    let that = this;
    // 获取用户是否开启用户授权相册
    if (e.currentTarget.dataset.sharetype != 1) {
      wx.getSetting({
        success(res) {
          // 如果没有则获取授权
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                wx.saveImageToPhotosAlbum({
                  filePath: that.data.shareImg,
                  success() {
                    wx.showToast({
                      title: '保存成功'
                    })
                  },
                  fail(res) {
                    console.log("err", res)
                    wx.showToast({
                      title: '保存失败',
                      icon: 'none'
                    })
                  }
                })
              },
              fail() {
                // 如果用户拒绝过或没有授权，则再次打开授权窗口
                //（ps：微信api又改了现在只能通过button才能打开授权设置，以前通过openSet就可打开，下面有打开授权的button弹窗代码）
                that.setData({
                  isshow: true,
                  openSet: true
                })
                console.log("openSet", that.data.openSet)
              }
            })
          } else {
            // 有则直接保存
            wx.saveImageToPhotosAlbum({
              filePath: that.data.shareImg,
              success() {
                wx.showToast({
                  title: '保存成功'
                })
              },
              fail(res) {
                console.log("err", res)
                wx.showToast({
                  title: '保存失败',
                  icon: 'none'
                })
              }
            })
          }
        }
      })
    }
  },
  cancleSet() {
    this.setData({
      openSet: false
    })
  },
  Gocum(){
    wx.navigateTo({
      url: '/pages/my/myreward/myreward',
    })
  },
  Govips(){
    wx.navigateTo({
      url: '/pages/my/myvips/myvips',
    })
  }
})