// pages/world/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"小可爱",
    sharemode:[{
      shareicon:'/images/icon_wxfriend.png',
      sharedesc:'微信好友',
      sharetype:1
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
    canvasbox:{
      top:0,
      bottom:0
    },
    openSet:false,
    shareImg:'',
    usewidth:0,
    useheight:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          'canvasbox.top': (res.screenHeight*(1-0.662)) / 2 + 'rpx',
          'canvasbox.bottom': (res.screenHeight * (1 - 0.662)) / 2 + 'rpx',
          usewidth: res.screenWidth - 90,
          useheight: (res.screenWidth - 90) * 1.2
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    const res = wx.getSystemInfoSync()
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.Createshare()
    console.log("1", this.data.name, this.data.canvasbox,this.data.usewidth, this.data.useheight)
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
  Createshare(){
    this.setData({
      isshow:false
    })
    var that = this;
    let width = that.data.usewidth;
    let height = that.data.useheight;
    console.log(that.data.usewidth, that.data.useheight)
    var context = wx.createCanvasContext('Share');
    // context.setFillStyle('#f00')
    // context.fillRect(0, 0, width, height)
    // context.fill();
    var path = "/images/share-bg.png";
    //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    //不知道是什么原因，手机环境能正常显示
    context.drawImage(path, 0, 0, width, height);
    // //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    var path2 = "/images/share.png";
    context.drawImage(path2, width * 0.0438, height*0.044, width*0.912, height*0.431);
    // //不知道是什么原因，手机环境能正常显示
    context.save(); // 保存当前context的状态
    context.arc(width * 0.48, height*0.47, width *0.11, 0, 2 * Math.PI);
    context.setFillStyle('#fff');
    context.setStrokeStyle('#000');
    context.fill();
    
    var name = that.data.name;
    //绘制名字
    context.setFontSize(15);
    context.setFillStyle('#333333');
    context.setTextAlign('center');
    context.fillText(name, width * 0.48, height * 0.625);
    context.stroke();
    //绘制修饰词
    context.setFontSize(14);
    context.setFillStyle('#646464');
    context.setTextAlign('center');
    context.fillText("邀请您参与全球时刻", width * 0.48, height * 0.69);
    context.stroke();
    //绘制修饰线
    context.setStrokeStyle('#999999');
    context.moveTo(width * 0.088, height * 0.68)
    context.lineTo(width * 0.179, height * 0.68)
    context.moveTo(width * 0.789, height * 0.68)
    context.lineTo(width * 0.89, height * 0.68)
    context.stroke()
    //绘制二维码背景
    context.drawImage('/images/qrcode-bg.png', width * 0.0526, height * 0.72, width * 0.919, width*0.31);
    //绘制二维码
    context.rect(width * 0.123, height * 0.765, width * 0.2, width * 0.2)
    context.setFillStyle('red')
    context.stroke()
    //绘制右下角文字
    context.setFontSize(13);
    context.setFillStyle('#323232');
    context.setTextAlign('left');
    context.fillText("长按识别左侧二维码即可", width * 0.403, height * 0.83);
    context.fillText("参团获利", width * 0.403, height * 0.88);
    context.stroke();
    context.draw();
    setTimeout(function(){
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
        fail:function(res){
          console.log("errtempFilePath",res)
        }
      })
    },1000)
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
})