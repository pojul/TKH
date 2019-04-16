// bh_step/pages/auctionPriceRecord/auctionPriceRecord.js
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
    id: -1,
    p: 1,
    isLoading: false,
    auctionLogs: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.id || options.id < 0){
      wx.navigateBack({})
      return;
    }
    this.setData({
      id: options.id
    });
    this.getAuctionLog();
  },

  getAuctionLog: function () {
    if (this.data.isLoading) {
      return;
    }
    this.setData({
      isLoading: true
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/auctionLog",
      data: {
        id: that.data.id,
        p_size: 10,
        p: that.data.p
      },
      success: function (t) {
        that.setData({
          isLoadBystep: false
        })
        if (t.info.auction_log.length > 0) {
          that.setData({
            p_bystep: (that.data.p_bystep + 1),
            auctionLogs: that.data.auctionLogs.concat(t.info.auction_log)
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
    this.getAuctionLog();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})