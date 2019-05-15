// bh_step/pages/authorize/authorize.js
var _tools = require("../../../util/tools.js"),
  _tools2 = _interopRequireDefault(_tools);
function _interopRequireDefault(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempWXLoginT: {},
    path: '',
    opt: '',
  },

  parseParams: function(data) {
    try {
      var tempArr = [];
      for (var i in data) {
        var key = encodeURIComponent(i);
        var value = encodeURIComponent(data[i]);
        tempArr.push(key + '=' + value);
      }
      var urlParamsStr = tempArr.join('&');
      return urlParamsStr;
    } catch (err) {
      return '';
    }
  },

  getAuthorize(t) {
    let that = this
    if ("getUserInfo:ok" == t.detail.errMsg) {
      wx.setStorageSync("user_encryptedData", t.detail.encryptedData);
      wx.setStorageSync("user_iv", t.detail.iv);
    } else {
      console.log("v define: " + that.data.path + '?' + that.parseParams(JSON.parse(that.data.opt)));
      wx.navigateBack({
        delta: 1
      })
      return;
    }
    this.login();
  },

  wxlogin: function () {
    var that = this;
    wx.login({
      success: function (t) {
        that.setData({
          tempWXLoginT: t
        })
      },
      fail: function () {
        wx.navigateBack({
          delta: 1
        })
      }
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
        console.log("success: " + that.data.path + '?' + that.parseParams(JSON.parse(that.data.opt)));
        if (that.data.path=='/bh_step/pages/index/index'){
          wx.switchTab({
            url: that.data.path + '?' + that.parseParams(JSON.parse(that.data.opt))
          })
        }else{
          wx.redirectTo({
            url: that.data.path + '?' + that.parseParams(JSON.parse(that.data.opt))
          })
        }
      },
      fail: function () {
        wx.navigateBack({
          delta: 1
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (!options.path || !options.opt){
      wx.navigateBack({});
      return;
    }
    this.setData({
      path: options.path,
      opt: options.opt
    })
    this.wxlogin();
    console.log("onLoad: " + JSON.stringify(options));
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})