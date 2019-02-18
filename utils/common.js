const regeneratorRuntime = require('./runtime.js');
import Request from '../jsondata/request.js';
const Toast=function(data){
  setTimeout(()=>{
    wx.showToast({
      title: data,
      icon: 'none'
    })
  },500)
}
const ShowModel = function (data, url, committext){
  wx.showModal({
    title: '提示',
    content: data,
    confirmText:committext,
    success:function(res){
      if (res.confirm) {
        wx.navigateTo({
          url: url,
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}
//是否已授权
const isGrantAuthorization=async function(){
  let isAuthorization = await new Promise(function (resolve, reject){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          if (!wx.getStorageSync('nick') || !wx.getStorageSync('headpic')){
            wx.getUserInfo({
              success(res) {
                var userData = JSON.parse(res.rawData)
                wx.setStorageSync('nick', userData.nickName)
                wx.setStorageSync('headpic', userData.avatarUrl)
              }
            })
          }
          resolve(true)
        } else {
          resolve(false)
        }
      }
    })
  })
  return isAuthorization
}
//是否有token
const isToken = async function(){
  let istoken = await new Promise(function (resolve, reject){
    if (!wx.getStorageSync('token')) {
      resolve({ success: false })  
    } else {
      resolve({ success: true })
    }
  })
  return istoken
}
//验证身份证是否正确
const idcardtf=function pwdfun(data) {
  const reg = /[a-zA-Z]/i;
  let time=0,
      findindex=18;
  const pwd = data;
  for (let i = 0; i < pwd.length; i++) {
    if (reg.test(pwd[i])) {
      time++;
      findindex=i
    }
  }
  console.log(time, findindex, pwd.length)
  if (time <= 1 && findindex >= 13 && pwd.length==18){
    return false
  }else{
    return true
  }
}
module.exports={
  Toast: Toast,
  ShowModel: ShowModel,
  isGrantAuthorization: isGrantAuthorization,
  isToken: isToken,
  idcardtf: idcardtf
}