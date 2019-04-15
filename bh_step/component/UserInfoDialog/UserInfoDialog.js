// bh_step/component/UserInfoDialog/UserInfoDialog.js
var _tools = require("../../../util/tools.js"),
  _tools2 = _interopRequireDefault(_tools);
var util = require("../../../we7/resource/js/util.js");

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
    show: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tempWXLoginT: {},
  },

  ready: function () {
    //if (wx.getStorageSync("has_login") != 2){
      this.wxlogin();
    //}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    refuse: function(){
      this.setData({
        show: false
      })
      this.triggerEvent('authorize', {authorized: false });
    },
    getAuthorize(t) {
      if ("getUserInfo:ok" == t.detail.errMsg) {
        wx.setStorageSync("user_encryptedData", t.detail.encryptedData);
        wx.setStorageSync("user_iv", t.detail.iv);
      } else {
        console.log("用户拒绝了");
        this.triggerEvent('authorize', { authorize: false});
      } 
      this.login();
      this.setData({
        show: false
      })
    },

    wxlogin: function () {
      var that = this;
      wx.login({
        success: function (t) {
          that.setData({
            show: true,
            tempWXLoginT: t
          })
        },
        fail: function () { }
      });
    },

    login: function () {
      var that = this;
      var e = wx.getStorageSync("parent_id"), o = wx.getStorageSync("goods_id"), n = wx.getStorageSync("share_tpye");
      _tools2.default.request({
        method: "get",
        url: "entry/wxapp/login",
        data: {
          code: that.data.tempWXLoginT.code,
          parent_id: e,
          goods_id: o,
          share_tpye: n,
          encryptedData: wx.getStorageSync("user_encryptedData"),
          iv: wx.getStorageSync("user_iv")
        },
        success: function (t) {
          wx.setStorageSync("member_type", t.info.member_type);
          wx.setStorageSync("token", t.info.token);
          wx.setStorageSync("member_id", t.info.member_id);
          wx.setStorageSync("has_login", 2);
          that.triggerEvent('authorize', { authorize: true });
        }
      });
    },
  }
})
