// bh_step/pages/invitefriend/invitefriend.js
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
    invitedFriends: [
      {},{},{},{}
    ],
    baseImageUrl: getApp().baseImageUrl,
    p_friends: 1,
    isover_friends: !1,
    share_text: "",
    share_image: "",
    firends: [],
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
    this.friendlist();
    this.getFriendIndex();
  },

  getFriendIndex: function(){
    _tools.request({
      method: "get",
      url: "entry/wxapp/friendIndex",
      data: {
        token: wx.getStorageSync("token"),
      },
      success: function (t) {
        that.setData(t.info);
      }
    });
  },

  friendlist: function() {
    _tools.request({
      method: "get",
      url: "entry/wxapp/friends",
      data: {
        token: wx.getStorageSync("token"),
        p: that.data.p_friends
      },
      success: function (t) {
        var e = t.info.firends;
        1 < that.data.p_friends && (e = that.data.firends.concat(e)), that.setData({
          firends: e
        }), t.info.firends.length < 10 && that.setData({
          isover_friends: !0
        });
      }
    });
  },

  toStrategyDetail: function () {
    wx.navigateTo({
      url: '/bh_step/pages/strategy/strategy?id=4',
    })
  },

  toranking: function () {
    wx.navigateTo({
      url: '/bh_step/pages/rankinglist/rankinglist',
    })
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
    this.data.isover_friends || (this.data.p_friends += 1, this.friendlist());
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return{
        title: that.data.share_text,
        imageUrl: that.data.share_image,
        path: "bh_step/pages/index/index?share_tpye=1&parent_id=" + that.data.member_id
      };
  }
})