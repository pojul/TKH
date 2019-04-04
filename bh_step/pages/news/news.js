// bh_step/pages/news/news.js

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
    itemUrl: [
      '/bh_step/pages/fansnotice/fansnotice',
      '/bh_step/pages/commentmess/commentmess',
      '/bh_step/pages/pointmess/pointmess'
    ],
    memberMsg: {},
  },

  toMessItem: function (e) {
    wx.navigateTo({
      url: this.data.itemUrl[e.currentTarget.dataset.item],
    })
  },

  getMemberMsg: function (e) {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/memberMsg",
      data: {},
      success: function (t) {
        that.setData({
          memberMsg: t.info
        })
      }
    });
  },

  getDate: function (date) {
    console.log("getDate");
    return "ddddd";
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMemberMsg();
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