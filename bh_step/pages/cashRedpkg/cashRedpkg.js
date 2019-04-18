// bh_step/pages/cashRedpkg/cashRedpkg.js
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
    redpkgs: [],
    isLoading: false,
    p_redpkgs: 1, //竞拍
  },

  getRedpkgs: function () {
    if (this.data.isLoading) {
      return;
    }
    this.setData({
      isLoading: true
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/videoBagLog",
      data: {
        p_size: 10,
        p: that.data.p_redpkgs
      },
      success: function (res) {
        that.setData({
          isLoading: false
        })
        if (res.info.video_bag_log.length > 0) {
          that.setData({
            p_redpkgs: (that.data.p_redpkgs + 1),
            redpkgs: that.data.redpkgs.concat(res.info.video_bag_log)
          })
        }
      },
      fail: function (res) {
        that.setData({
          isLoading: false
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRedpkgs();
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
    this.getRedpkgs();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})