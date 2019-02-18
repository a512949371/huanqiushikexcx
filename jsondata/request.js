//30，33,40,66
const regeneratorRuntime = require('../utils/runtime.js');
import Common from '../utils/common.js';
const Http = 'http://192.168.54.66:11000/';
let questtime = 0;
import Apiurl from './apiurl';
const Login = async function(data, onsuccess) {
  return await new Promise(function(resolve, reject) {
    if (!wx.getStorageSync('token')) {
      wx.login({
        success(res) {
          console.log("code", res.code, Apiurl.loginurl)
          wx.request({
            url: Http + Apiurl.loginurl,
            method: 'Post',
            data: {
              code: res.code,
              channel: 0
            },
            success: function(res) {
              console.log('is',res)
              wx.setStorageSync('token', res.data.data.token)
              wx.setStorageSync('isregister', res.data.data.isRegister)
              resolve({
                success: true,
                data: res.data
              })
            },
            fail: function(res) {
              reject({
                success: false,
                data: res.data
              })
            },
            complete: function(res) {
              console.log("respost", res)
            }
          })
        }
      })
    } else {
      resolve({
        success: true
      })
    }
  })
}
//会员登录
const VipLogin = function(data, onsuccess) {
  console.log('viplogin',data)
  AjaxPost(Http, Apiurl.login, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//首页内容
const Index = function(data, onsuccess) {
  AjaxGet(Http, Apiurl.index, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//首页公告详情
const Noticedetail = function(data, onsuccess) {
  AjaxGet(Http, Apiurl.notice + '?id=' + data, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//商城首页分类
const Shopclass = function(data, onsuccess) {
  AjaxGet(Http, Apiurl.shopIndexClass, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//商城首页商品
const ShopProduct = function(data, onsuccess) {
  AjaxGet(Http, Apiurl.shopIndexProduct + '?pageNo=' + data.pageNo + '&pageSize=' + data.pageSize, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//商品详情
const ShopDetail = function(data, onsuccess) {
  AjaxGet(Http, Apiurl.shopDetail + '?id=' + data, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//生成商品订单
const Createshoporder=function(data,onsuccess){
  AjaxGetToken(Http, Apiurl.createshoporder+'?id='+data,data,function(res){
    onsuccess(res)
  }, questtime)
}
//提交订单并支付
const SubmitOrder=function(data,onsuccess){
  AjaxToken(Http, Apiurl.submitOrder,data,function(res){
    onsuccess(res)
  }, questtime,'Post')
}
//订单详情内积分支付
const Jfpay=function(data,onsuccess){
  AjaxToken(Http, Apiurl.jfpay,data,function(res){
    onsuccess(res)
  },questtime,'Post')
}
//获取微信支付参数
const PayOrder=function(data,onsuccess){
  AjaxToken(Http, Apiurl.payOrder,data,function(res){
    onsuccess(res)
  }, questtime,'Post')
}
//分类商品
const ShopClass = function(data, onsuccess) {
  AjaxGet(Http, Apiurl.shopClass + '?pageNo=' + data.pageNo + '&pageSize=' + data.pageSize + '&id=' + data.id, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//获取验证码
const GetSms = function(data, onsuccess) {
  AjaxToken(Http, Apiurl.getSms, data, function(res) {
    onsuccess(res)
  }, questtime, 'Post')
}
//验证支付密码是否正确
const Pwdtf=function(data,onsuccess){
  AjaxGetToken(Http, Apiurl.pwdtf+'?pwd='+data,data,function(res){
    onsuccess(res)
  },questtime)
}
//全球公排列表
const World = function(data, onsuccess) {
  AjaxGetToken(Http, Apiurl.world + '?pageNo=' + data.pageNo + '&pageSize=' + data.pageSize + '&status=' + data.status, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//出局账号信息
const OutInfo = function(data, onsuccess) {
  AjaxGetToken(Http, Apiurl.outInfo + '?id=' + data, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//确认出局
const Trueout=function(data,onsuccess){
  AjaxGetToken(Http, Apiurl.trueout + '?id=' + data.id + '&accountRankConfigId=' + data.accountRankConfigId,data,function(res){
    onsuccess(res)
  }, questtime)
}
//用户信息
const UserInfo = function(data, onsuccess) {
  AjaxGetToken(Http, Apiurl.adminInfo, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//用户帮助
const Help=function(data,onsuccess){
  AjaxGet(Http,Apiurl.help,data,function(res){
    onsuccess(res)
  }, questtime)
}
//用户地址列表
const AddressList = function(data, onsuccess) {
  console.log(data)
  AjaxGetToken(Http, Apiurl.userAddressList + '?pageNo=' + data.pageNo + '&pageSize=' + data.pageSize, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//新增用户地址列表
const NewAddressList = function(data, onsuccess) {
  AjaxToken(Http, Apiurl.userAddressList, data, function(res) {
    onsuccess(res)
  }, questtime, 'Put')
}
//修改默认地址
const EditDefaultAddress = function(data, onsuccess) {
  AjaxToken(Http, Apiurl.defaultaddress, data, function(res) {
    onsuccess(res)
  }, questtime, 'Post')
}
//删除地址
const DeleteAddress = function(data, onsuccess) {
  AjaxToken(Http, Apiurl.userAddressList, data, function(res) {
    onsuccess(res)
  }, questtime, 'Delete')
}
//查看地址信息
const Getaddressinfo = function(data, onsuccess) {
  AjaxGetToken(Http, Apiurl.getaddressinfo + '/' + data, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//编辑地址信息
const EditAddressList = function(data, onsuccess) {
  AjaxToken(Http, Apiurl.userAddressList, data, function(res) {
    onsuccess(res)
  }, questtime, 'Post')
}
//会员信息查看
const Getuesrinfo = function(data, onsuccess) {
  AjaxGetToken(Http, Apiurl.userinfo, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//我的分享会员
const Sharevip=function(data,onsuccess){
  AjaxGetToken(Http, Apiurl.sharevip + '?channel=0&pageNo=' + data.pageNo +'&pageSize='+data.pageSize,data,function(res){
    onsuccess(res)
  }, questtime)
}
//会员信息保存
const Setuesrinfo = function(data, onsuccess) {
  AjaxToken(Http, Apiurl.userinfo, data, function(res) {
    onsuccess(res)
  }, questtime, 'Post')
}
//会员通知消息
const UserMessage = function(data, onsuccess) {
  AjaxGetToken(Http, Apiurl.usermessage + '?pageNo=' + data.pageNo + '&pageSize=' + data.pageSize, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//我的订单列表
const OrderList = function(data, onsuccess) {
  AjaxGetToken(Http, Apiurl.orderList + '?page=' + data.pageNo + '&size=' + data.pageSize + '&showType=' + data.showType, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//取消订单
const CancalOrder = function(data, onsuccess) {
  AjaxGetToken(Http, Apiurl.cancalorder + '/' + data, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//确认收货
const TrueOrder = function(data, onsuccess) {
  AjaxGetToken(Http, Apiurl.trueorder + '/' + data, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//订单详情
const OrderDetail = function(data, onsuccess) {
  AjaxGetToken(Http, Apiurl.orderDetail + '/' + data, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//提现账号及费率查询
const GetWithdraw = function(data, onsuccess) {
  AjaxGetToken(Http, Apiurl.getWithdraw, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//创建提现账号
const CreateWithdeaw = function(data, onsuccess) {
  AjaxToken(Http, Apiurl.createWithdeaw, data, function(res) {
    onsuccess(res)
  }, questtime, 'Post')
}
//提现账号列表
const WithdeawList = function(data, onsuccess) {
  AjaxGetToken(Http, Apiurl.withdeawList, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//删除提现账号
const DeleteWithdraw = function(data, onsuccess) {
  AjaxGetToken(Http, Apiurl.deleteWithdraw + '?id=' + data, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//查询提现账号信息
const SelectWithdraw = function(data, onsuccess) {
  AjaxGetToken(Http, Apiurl.selectWithdraw + '?id=' + data, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//编辑提现账号
const EditWithdraw = function(data, onsuccess) {
  AjaxToken(Http, Apiurl.editWithdraw, data, function(res) {
    onsuccess(res)
  }, questtime, 'Post')
}
//提现申请提交
const WithdrawConfirm = function(data, onsuccess) {
  AjaxToken(Http, Apiurl.withdrawConfirm, data, function(res) {
    onsuccess(res)
  }, questtime, 'Post')
}
//提现记录
const WithdrawRecordList = function(data, onsuccess) {
  AjaxGetToken(Http, Apiurl.withdrawRecordList + '?pageNo=' + data.pageNo + '&pageSize=' + data.pageSize, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//转账申请
const TransferConfirm = function(data, onsuccess) {
  AjaxToken(Http, Apiurl.transferConfirm, data, function(res) {
    onsuccess(res)
  }, questtime, 'Post')
}
//转账记录
const TransferList = function(data, onsuccess) {
  AjaxGetToken(Http, Apiurl.transferList + '?pageNo=' + data.pageNo + '&pageSize=' + data.pageSize + '&type=' + data.type, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//编辑密码时的验证码
const EditPwdCode = function(data, onsuccess) {
  AjaxGetToken(Http, Apiurl.editPwdCode, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//编辑密码
const EditPwd = function(data, onsuccess) {
  AjaxToken(Http, Apiurl.editPwd, data, function(res) {
    onsuccess(res)
  }, questtime, 'Post')
}
//奖金明细
const SelectBonus = function(data, onsuccess) {
  AjaxGetToken(Http, Apiurl.selectBonus + '?pageNo=' + data.pageNo + '&pageSize=' + data.pageSize + '&type=' + data.type, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//财务明细
const Finance = function(data, onsuccess) {
  AjaxGetToken(Http, Apiurl.finance + '?page=' + data.pageNo + '&size=' + data.pageSize + '&showType=' + data.type, data, function(res) {
    onsuccess(res)
  }, questtime)
}
//获取会员邀请二维码
const Qrcode=function(data,onsuccess){
  AjaxGetToken(Http, Apiurl.qrcode,data,function(res){
    onsuccess(res)
  }, questtime)
}
//会员注册
const Register = function(data, onsuccess) {
  AjaxToken(Http, Apiurl.register, data, function(res) {
    onsuccess(res)
  }, questtime, 'Put')
}
const AjaxPost = function(Http, url, data, onsuccess, questtime) {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  console.log("c", data)
  wx.request({
    url: Http + url,
    method: 'Post',
    data: data,
    success: function(res) {
      onsuccess(res)
    },
    fail: function(res) {
      onsuccess(res)
    },
    complete: function(res) {
      wx.hideLoading()
      console.log("respost", res)
      if (res.statusCode == 401) {
        wx.removeStorageSync('token');
        wx.removeStorageSync('isregister');
        Login().then((res) => {
          console.log('2', res)
          if (res.success) {
            // setTimeout(function () {
            //   AjaxPost(Http, url, data, onsuccess, questtime)
            // }, 2000)
          }
        })
      }
    }
  })
}
const AjaxPostToken = function(Http, url, data, onsuccess, questtime) {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  wx.request({
    url: Http + url,
    method: 'Post',
    data: data,
    header: {
      'Authorization': 'Bearer ' + wx.getStorageSync('token')
    },
    success: function(res) {
      onsuccess(res)
    },
    fail: function(res) {
      onsuccess(res)
    },
    complete: function(res) {
      wx.hideLoading()
      console.log("respost", res)
      if (res.statusCode == 401) {
        wx.removeStorageSync('token');
        wx.removeStorageSync('isregister');
        Login().then((res) => {
          console.log('2', res)
          if (res.success) {
            setTimeout(function () {
              AjaxPostToken(Http, url, data, onsuccess, questtime)
            }, 2000)
          }
        })
      }
    }
  })
}
const AjaxGet = function(http, url, data, onsuccess, questtime) {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  wx.request({
    url: Http + url,
    method: "Get",
    data: '',
    success: function(res) {
      onsuccess(res)
    },
    fail: function(res) {
      onsuccess(res)
    },
    complete: function(res) {
      wx.hideLoading()
      console.log("resget", res, res.statusCode == 401)
      if (res.statusCode == 401 ) {
        wx.removeStorageSync('token');
        wx.removeStorageSync('isregister');
        Login().then((res) => {
          console.log('2', res)
          if (res.success) {
            setTimeout(function () {
              AjaxGet(Http, url, data, onsuccess, questtime)
            }, 2000)
          }
        })
      }
    }
  })
}
const AjaxGetToken = function(http, url, data, onsuccess, questtime) {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  wx.request({
    url: Http + url,
    method: 'Get',
    data: '',
    header: {
      'Authorization': 'Bearer ' + wx.getStorageSync('token')
    },
    success: function(res) {
      onsuccess(res)
    },
    fail: function(res) {
      onsuccess(res)
    },
    complete: function(res) {
      wx.hideLoading()
      let isRegiste = wx.getStorageSync('isregister')||false;
      console.log("resget", res)
      if (res.statusCode == 401 && isRegiste) {
        wx.removeStorageSync('token');
        wx.removeStorageSync('isregister');
         Login().then((res)=>{
           console.log('2',res)
           if (res.success){
             setTimeout(function () {
               AjaxGetToken(Http, url, data, onsuccess, questtime)
             }, 2000)
           }
         })
      }
    }
  })
}
const AjaxToken = function(http, url, data, onsuccess, questtime, method) {
  wx.showLoading({
    title: '加载中',
    mask:true
  })
  console.log("data", data)
  wx.request({
    url: Http + url,
    method: method,
    data: data,
    header: {
      'Authorization': 'Bearer ' + wx.getStorageSync('token')
    },
    success: function(res) {
      onsuccess(res)
    },
    fail: function(res) {
      onsuccess(res)
    },
    complete: function(res) {
      wx.hideLoading()
      let isRegiste = wx.getStorageSync('isregister') || false
      console.log("resget", res)
      if (res.statusCode == 401 && isRegiste) {
        wx.removeStorageSync('token');
        wx.removeStorageSync('isregister');
        Login().then((res) => {
          console.log('l',res)
          if (res.success) {
            setTimeout(function () {
              AjaxToken(Http, url, data, onsuccess, questtime, method)
            }, 2000)
          }
        })
      }
    }
  })
}
module.exports = {
  AjaxPost: AjaxPost,
  AjaxPostToken: AjaxPostToken,
  AjaxGetToken: AjaxGetToken,
  AjaxToken: AjaxToken,
  AjaxGet: AjaxGet,
  Login: Login,
  Index: Index,
  Noticedetail: Noticedetail,
  Shopclass: Shopclass,
  ShopProduct: ShopProduct,
  ShopDetail: ShopDetail,
  Createshoporder: Createshoporder,
  ShopClass: ShopClass,
  Register: Register,
  GetSms: GetSms,
  World: World,
  OutInfo: OutInfo,
  UserInfo: UserInfo,
  AddressList: AddressList,
  NewAddressList: NewAddressList,
  EditDefaultAddress: EditDefaultAddress,
  DeleteAddress: DeleteAddress,
  Getaddressinfo: Getaddressinfo,
  EditAddressList: EditAddressList,
  Getuesrinfo: Getuesrinfo,
  Setuesrinfo: Setuesrinfo,
  UserMessage: UserMessage,
  OrderList: OrderList,
  CancalOrder: CancalOrder,
  TrueOrder: TrueOrder,
  OrderDetail: OrderDetail,
  GetWithdraw: GetWithdraw,
  CreateWithdeaw: CreateWithdeaw,
  WithdeawList: WithdeawList,
  DeleteWithdraw: DeleteWithdraw,
  SelectWithdraw: SelectWithdraw,
  EditWithdraw: EditWithdraw,
  WithdrawConfirm: WithdrawConfirm,
  WithdrawRecordList: WithdrawRecordList,
  TransferConfirm: TransferConfirm,
  TransferList: TransferList,
  EditPwdCode: EditPwdCode,
  EditPwd: EditPwd,
  SelectBonus: SelectBonus,
  Finance: Finance,
  VipLogin: VipLogin,
  SubmitOrder: SubmitOrder,
  PayOrder: PayOrder,
  Qrcode: Qrcode,
  Trueout: Trueout,
  Jfpay: Jfpay,
  Pwdtf: Pwdtf,
  Sharevip: Sharevip,
  Help: Help
}