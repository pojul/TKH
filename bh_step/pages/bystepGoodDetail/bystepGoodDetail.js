// bh_step/pages/bystepGoodDetail/bystepGoodDetail.js
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
    goodid: -1,
    goodDetail: {},
    showRules: false,
  },

  getGoodDetail: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/groupGoodsDetail",
      data: {
        id: that.data.goodid
      },
      success: function (t) {
        that.setData({
          goodDetail: t.info.group_goods
        })
        var article = t.info.group_goods.content;
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    });
  },

  showRulesDialog: function (e) {
    this.setData({
      showRules: e.currentTarget.dataset.show
    })
  },

  assemble: function () {
    if (this.data.goodDetail.inventory <= 0) {
      this.showToast('该商品已售完');
    }
    wx.redirectTo({
      url: '/bh_step/pages/bystepDetail/bystepDetail?type=0&goodid=' + this.data.goodid
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.goodid || options.goodid < 0) {
      this.showToast('该商品不存在');
      wx.navigateBack({});
    }
    this.setData({
      goodid: options.goodid
    });
    this.getGoodDetail();
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