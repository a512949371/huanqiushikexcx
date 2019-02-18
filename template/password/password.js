// template/password/password.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isshow:{
      type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: true, // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer(newVal, oldVal, changedPath) {
        this.setData({
          sshow:newVal,
          smsinputfous: oldVal,
          pwd:''
        })
        console.log('t', this.data.smsinputfous)
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isshow:true,
    oldnum: 0,
    smsinputfous: false,
    pwd:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //输入验证码
    Inputsms(e) {
      var that = this;
      var num = e.detail.cursor;
      var sms = e.detail.value;
      console.log(e.detail.value);
      if (num > this.data.oldnum) {
        this.setData({
          oldnum: e.detail.cursor
        })
        switch (num) {
          case 1:
            this.setData({
              'inputdata.inputone': '*',
            })
            break;
          case 2:
            this.setData({
              'inputdata.inputtwo': '*'
            })
            break;
          case 3:
            this.setData({
              'inputdata.inputthree': '*'
            })
            break;
          case 4:
            this.setData({
              'inputdata.inputfour': '*'
            })
            break;
          case 5:
            this.setData({
              'inputdata.inputfive': '*'
            })
            break;
          case 6:
            this.setData({
              'inputdata.inputsix': '*'
            })
            break;
          default:
            break;
        }
        console.log(e.detail.value, this.data.inputdata, this.data.oldnum);
        if (e.detail.cursor == 6) {
          var calldata = {
            id: this.data.phoneid,
            code: e.detail.value,
          }
          Request.Indexphonecall(calldata, function (res) {
            console.log("res", res)
            if (res.data.isOk) {
              that.setData({
                issmsbox: false,
                userphone: '',
                smstime: 60,
                smsdata: '',
                oldnum: 0,
                smsinputfous: false,
                'inputdata.inputone': '',
                'inputdata.inputtwo': '',
                'inputdata.inputthree': '',
                'inputdata.inputfour': '',
                'inputdata.inputfive': '',
                'inputdata.inputsix': '',
              })
              wx.showToast({
                title: '提交成功，请保持电话畅通',
                icon: "none"
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: "icon"
              })
            }
          })
        }
      } else {
        switch (num) {
          case 0:
            this.setData({
              'inputdata.inputone': '',
            })
            break;
          case 1:
            this.setData({
              'inputdata.inputtwo': ''
            })
            break;
          case 2:
            this.setData({
              'inputdata.inputthree': ''
            })
            break;
          case 3:
            this.setData({
              'inputdata.inputfour': ''
            })
            break;
          case 4:
            this.setData({
              'inputdata.inputfive': ''
            })
            break;
          case 5:
            this.setData({
              'inputdata.inputsix': ''
            })
            break;
          default:
            break;
        }
        this.setData({
          oldnum: e.detail.cursor
        })
      }
    },
    closepwd(e) {
      this.triggerEvent('closepwd', { type: e.currentTarget.dataset.type, pwd:this.data.pwd}, {})
    },
    _input(e){
      this.setData({
        pwd:e.detail.value
      })
    }
  }
})
