 const Apiurl = {
   loginurl: 'auth/threeLogin',//获取token
   index: 'public/pageInformation', //首页接口
   notice: 'public/findArticle', //首页消息详情
   shopIndexClass: 'public/findProductClass', //商城首页分类
   shopIndexProduct: 'public/findProduct', //商城首页商品,
   shopDetail: 'public/findProductDetail', //商品详情
   createshoporder:'client/pc/findProductOrder',//生成商品订单
   submitOrder:'client/pc/order/submit',//提交订单生成订单号
   payOrder:'public/unifiedOrder',//获取微信支付参数
   jfpay:'client/pc/order/payJF',//订单详情内积分支付
   pwdtf:'client/pc/checkpwd',//验证支付密码是否正确
   shopClass: 'public/findByProductClassId', //分类商品
   register: 'public/account', //会员注册,
   getSms: 'public/sendCode', //获取手机验证码
   editPwdCode:'client/pc/code',//编辑密码时的验证码
   world: 'client/pc/rankInfo', //全球公排列表
   outInfo: 'client/pc/accountOutInformation', //出局账号信息
   trueout:'client/pc/accountOutConfirm',//确认出局
   adminInfo: 'client/pc', //用户信息
   userAddressList: 'client/pc/address', //用户地址列表
   defaultaddress: 'client/pc/address/default', //修改默认地址
   getaddressinfo: 'client/pc/address', //获取单条地址信息
   userinfo: 'client/pc/account', //会员信息
   usermessage: 'client/pc/msg', //会员通知消息
   sharevip: 'client/pc/share',//我的分享会员
   orderList: 'client/pc/order/list', //我的订单列表
   cancalorder:'client/pc/order/cancel',//取消订单
   trueorder:'client/pc/order/confirm',//确认收货
   orderDetail:'client/pc/order/detail',//订单详情
   getWithdraw:'client/getWithdraw',//提现账号及费率
   withdrawConfirm:'client/withdrawConfirm',//提现申请
   createWithdeaw:'client/addWithdraw',//创建提现账号
   withdeawList: 'client/withdrawList',//提现账号列表
   deleteWithdraw:'client/deleteWithdraw',//删除提现账号
   selectWithdraw:'client/selectWithdraw',//查询提现账号信息
   editWithdraw:'client/editWithdraw',//编辑提现账号
   withdrawRecordList:'client/withdrawLogRecord',//提现记录
   transferConfirm:'client/transferConfirm',//转账申请
   transferList:'client/getTransfers',//转账记录
   editPwd:'client/pc/pwd',//编辑密码
   selectBonus: 'client/pc/selectBonus',//奖金明细
   finance:'client/pc/financials',//财务明细
   login:'auth/clientLogin',//会员登录
   qrcode:'client/pc/qrcode',//获取会员邀请二维码
   help:'public/accounthelp',//用户帮助
 }
 export default Apiurl