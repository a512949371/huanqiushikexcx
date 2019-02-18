// template/share/share.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sharedata:{
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer(newVal, oldVal, changedPath) {
        this.data.qrcode = newVal
      }
    },
    isshow:{
      type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: true, // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer(newVal, oldVal, changedPath) {
        this.data.isshow=newVal
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    name: "小可爱",
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
    }],
    canvasbox: {
      top: 0,
      bottom: 0
    },
    isshow:true,
    openSet: false,
    shareImg: '',
    usewidth: 0,
    useheight: 0,
    nick:'',
    headpic:'',
    qrcode:''
  },
  lifetimes: {
    attached() {
      var that = this;
      wx.getSystemInfo({
        success: function (res) {
          console.log(res)
          that.setData({
            'canvasbox.top': (res.screenHeight * (1 - 0.75)) / 2 + 'rpx',
            'canvasbox.bottom': (res.screenHeight * (1 - 0.75)) / 2 + 'rpx',
            usewidth: res.screenWidth - 90,
            useheight: (res.screenWidth - 90) * 1.2
          })
        },
      })
      this.setData({
        nick:wx.getStorageSync('nick'),
        headpic:wx.getStorageSync('headpic'),
        qrcode:this.data.qrcode
      })
      
    },
  },
  pageLifetimes:{
    show() {
      this.Createshare()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    Closeshare(){
      this.triggerEvent('Closeshare', {isshow:true}, {})
    },
    Createshare() {
      console.log('2',this.data.nick,this.data.headpic,this.data.qrcode)
      var that = this;
      let width = that.data.usewidth;
      let height = that.data.useheight;
      console.log(that.data.usewidth, that.data.useheight)
      var context = wx.createCanvasContext('Share',this);
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
      context.drawImage('/images/qrcode-bg.png', width * 0.0526, height * 0.72, width * 0.919, width * 0.31);
      //绘制二维码
      context.drawImage('', width * 0.123, height * 0.765, width * 0.2, width * 0.2);
      //绘制右下角文字
      context.beginPath()
      context.setFontSize(13);
      context.setFillStyle('#323232');
      context.setTextAlign('left');
      context.fillText("长按识别左侧二维码即可", width * 0.403, height * 0.83);
      context.fillText("参团获利", width * 0.403, height * 0.88);
      context.stroke();
      context.draw(false,function(){
        setTimeout(function () {
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
            fail: function (res) {
              console.log("errtempFilePath", res)
            }
          }, that)
        }, 500)
      });
    },
    // 长按保存事件
    saveImg() {
      let that = this;
      // 获取用户是否开启用户授权相册
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
                  openSet: true
                })
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
    },
  }
})
