// bh_step/pages/bystepRules/bystepRules.js
var WxParse = require('../../component/wxParse/wxParse.js');

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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var article = "<p>这是拼团规则这是拼团规则这是拼团规则这是拼团规则这是拼团规则这是拼团规则这是拼团规则这是拼团规则这是拼团规则这是拼团规则这是拼团这是拼团规则这是拼团规则这是拼团规则这是拼团规则这是拼团规则这是拼团规则这是拼团规则这是拼团规则这是拼团规则这是拼团规则</p>";
    // WxParse.wxParse('article', 'html', article, this, 5);
    if (!options.type){
      return;
    }
    if (options.type==1){
      this.getStepRule();
    } else if (options.type==2){
      this.getAuctionRule();
    }
  },

  getStepRule: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/stepRule",
      data: {},
      success: function (t) {
        var rules = t.info;
        WxParse.wxParse('rules', 'html', rules, that, 5);
      }
    });
  },

  getAuctionRule: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/auctionRule",
      data: {},
      success: function (t) {
        var rules = t.info;
        WxParse.wxParse('rules', 'html', rules, that, 5);
      }
    });
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

  }
})