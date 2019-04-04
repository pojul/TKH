// bh_step/pages/strategylist/strategylist.js

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
    cueerntPage: 1,
    articles: []
  },

  getArticles: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/article",
      data: {
        p_size: 10,
        p: that.data.cueerntPage,
        token: wx.getStorageSync("token")
      },
      success: function (t) {
        that.setData({
          articles: t.info
        })
      }
    });
  },

  toStrategyDetail: function (e) {
    console.log("toStrategyDetail--->" + JSON.stringify(e));
    wx.navigateTo({
      url: '/bh_step/pages/strategy/strategy?id=' + e.currentTarget.dataset.articleid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticles();
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