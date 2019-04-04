// bh_step/component/pay_dialog/pay_dialog.js

var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {    //控制area_select显示隐藏
      type: Boolean,
      value: false
    },
    payMoney:{
      type: Number,
      value: 0
    },
    weixinPayOnly:{
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    payType: 1,
    leftMoney: 0, //用户余额
    payCheckIcons: ['../../images/pay_selected.png','../../images/pay_unselect.png'],
  },

  ready: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/memberBalance",
      data: {
      },
      success: function (t) {
        that.setData({
          leftMoney: t.info
        })
      }
    });
    this.setData({
      payType: this.properties.weixinPayOnly?2:1
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkPay: function(e){
      if(this.data.payType == 1 && this.data.leftMoney < this.data.payMoney){
        this.showToast("余额不足");
        return;
      }
      this.setData({
        show: e.currentTarget.dataset.show
      })
      this.triggerEvent('checkPay', {payType: this.data.payType});
    },

    changePayType: function (e) {
      this.setData({
        payType: e.currentTarget.dataset.paytype
      })
    },

    close: function () {
      this.setData({
        show: false
      })
    },

    showToast: function (str) {
      wx.showToast({
        title: str,
        icon: 'none',
        duration: 1500,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
  }
})
