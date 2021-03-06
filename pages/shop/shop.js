// pages/shop/shop.js
import Request from '../../jsondata/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // navdata:[{
    //   navimg:'../../images/icon_shop-nav1.png',
    //   navname:'营养膳食'
    // },
    //   {
    //     navimg: '../../images/icon_shop-nav2.png',
    //     navname: '精品三七'
    //   },
    //   {
    //     navimg: '../../images/icon_shop-nav3.png',
    //     navname: '护肤用品'
    //   },
    //   {
    //     navimg: '../../images/icon_shop-nav4.png',
    //     navname: '洗发护发'
    //   }],
      // shopdata:[{
      //   shopimg:'../../images/shop2.png',
      //   shopname:'代餐粉',
      //   shopdesc:'代餐粉是一种由谷类、豆类、薯类食材等为主...',
      //   shopprice:'498',
      //   shopcompany:'2盒',
      //   isworld:false
      // },
      //   {
      //     shopimg: '../../images/shop3.png',
      //     shopname: '代餐粉',
      //     shopdesc: '代餐粉是一种由谷类、豆类、薯类食材等为主...代餐粉是一种由谷类、豆类、薯类食材等为主...',
      //     shopprice: '498',
      //     shopcompany: '2盒',
      //     isworld:true
      //   },
      //   {
      //     shopimg: '../../images/shop4.png',
      //     shopname: '代餐粉',
      //     shopdesc: '代餐粉是一种由谷类、豆类、薯类食材等为主...',
      //     shopprice: '498',
      //     shopcompany: '2盒',
      //     isworld: false
      //   },
      //   {
      //     shopimg: '../../images/shop5.png',
      //     shopname: '代餐粉',
      //     shopdesc: '代餐粉是一种由谷类、豆类、薯类食材等为主...',
      //     shopprice: '498',
      //     shopcompany: '2盒',
      //     isworld: false
      //   },],
        navdata: [],
        shopdata:[],
        pagedata:{
          pageNo:1,
          pageSize:10
        }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Request.Login().then((res) => {
      console.log("?", res)
    }).catch((res) => {
      console.log("??", res)
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
    Request.Shopclass('',(res)=>{
      if(res.data.isOK){
        this.setData({
          navdata:res.data.data
        })
      }else{
        console.log("err",res)
      }
    })
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
      'pagedata.pageNo':1
    })
    this._ajaxdata(2)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.pagedata.pageNo++;
    this.setData({
      pagedata:this.data.pagedata
    })
    this._ajaxdata(1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //数据请求事件
  _ajaxdata(num) {
    if(num==2){
      this.data.shopdata=[];
    }
    Request.ShopProduct(this.data.pagedata, (res) => {
      if (res.data.isOK) {
        if(res.data.data!=null&&res.data.data.length>0){
          this.setData({
            shopdata:this.data.shopdata.concat(res.data.data),
            'pagedata.pageNo':this.data.pagedata.pageNo
          })
        }else{
          if (num == 1 && this.data.pagedata.pageNo!=1){
            this.data.pagedata.pageNo--
             this.setData({
               shopdata:this.data.shopdata,
               'pagedata': this.data.pagedata
             })
          }
        }
        console.log("page",this.data.pagedata)
      } else {
        console.log("err", res)
      }
    })
  },
  _goshop(e){
    wx.navigateTo({
      url: '/pages/shop/oneshoplist/oneshoplist?id=' + e.currentTarget.dataset.id,
    })
  },
  _goshopdetail(e) {
    wx.navigateTo({
      url: '/pages/shop/detail/detail?id='+e.currentTarget.dataset.id,
    })
  },
  
})