// bh_step/pages/rankinglist/rankinglist.js
var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);
var that;

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
    ranklist: [],
    vipPics: [
      '../../images/vip_gold.png',
      '../../images/vip_silver.png',
      '../../images/vip_copper.png'
    ],
    baseImageUrl: getApp().baseImageUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    that = this;
    _tools.request({
      method: "get",
      url: "entry/wxapp/config",
      data: {
        token: wx.getStorageSync("token"),
        key: "xcx_title,share_text,share_image"
      },
      success: function (t) {
        that.setData(t.info);
      }
    });
    this.getRankList();
  },

  getRankList: function () {
    that = this;
    _tools.request({
      method: "get",
      url: "entry/wxapp/memberIncomeLeaderboard",
      data: {
      },
      success: function (t) {
        that.setData({
          ranklist: t.info.member_list
        })
      }
    });
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
    return {
      title: that.data.share_text,
      imageUrl: that.data.share_image,
      path: "bh_step/pages/index/index?share_tpye=1&parent_id=" + that.data.member_id
    };
  }
})