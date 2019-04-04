// bh_step/pages/redpkgreport/redpkgreport.js

var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

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
    postid: -1,
    report: {},
  },

  getReport: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/postReport",
      data: {
        post_id: that.data.postid
      },
      success: function (t) {
        that.setData({
          report: t.info.report
        })
      }
    });
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
    if (!options.post_id || options.post_id < 0){
      this.showToast("数据错误");
      wx.navigateBack({
        delta: 1,
      })
      return;
    }
    this.setData({
      postid: options.post_id
    })
    this.getReport();
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