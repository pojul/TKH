// bh_step/pages/auctionResults/auctionResults.js
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
    id: -1,
    result: {},
    userInfo: {},
  },

  getResult: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/auctionResult",
      data: {
        goods_id: that.data.id
      },
      success: function (t) {
        that.setData({
          result: t.info
        })
      }
    });
  },

  getUserInfo: function (memberId) {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/userInfo",
      data: {
        view_member_id: wx.getStorageSync("member_id")
      },
      success: function (t) {
        that.setData({
          userInfo: t.info.userInfo
        })
      }
    });
  },

  receiveGood: function () {
    if (this.data.result.order.status != 2){
      this.toMainDetail();
      return;
    }
    wx.showLoading({
      title: '领取中',
      mask: !0
    });
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/auctionReceiveGood",
      data: {
        order_id: that.data.result.order.id
      },
      success: function (t) {
        wx.hideLoading();
        that.data.result.order.status = 3;
        that.setData({
          result: that.data.result
        })
        that.showToast("领取成功");
      },
      fail(res) {
        wx.hideLoading();
        that.showToast("领取商品失败");
      }
    });
  },

  toMainDetail: function () {
    wx.switchTab({
      url: '/bh_step/pages/goodsconvert/goodsconvert',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.id || options.id < 0) {
      wx.navigateBack({})
      return;
    }
    this.setData({
      id: options.id
    });
    this.getResult();
    this.getUserInfo();
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