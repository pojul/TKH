// bh_step/pages/auctionDetail/auctionDetail.js
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
    goods: {
      image: [
        'https://img01.sogoucdn.com/app/a/100520024/5744a89854553220cb1f6d78cb1744ad',
        'https://img04.sogoucdn.com/app/a/100520024/4ad7c665ba13d0ab6bd526f94056a2c2',
        'https://img03.sogoucdn.com/app/a/100520024/7b7acc0a7b5f3967dc356d4392ebce34'
      ],
      id: -1,
      type: -1, //1: 参与; 2: 助理
      goodDetail: {},
    }
  },

  toRulesDetail: function () {
    wx.navigateTo({
      url: '/bh_step/pages/bystepRules/bystepRules?type=' + 2
    })
  },

  getGoodDetail: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/auctionDetail",
      data: {
        id: that.data.id
      },
      success: function (t) {
        that.setData({
          goodDetail: t.info 
        });
        var article = t.info.goods.content;
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!options.id || options.id < 0){
      this.showToast("数据错误");
      wx.navigateBack({})
      return;
    }
    if (!options.type || options.type < 0) {
      this.showToast("数据错误");
      wx.navigateBack({})
      return;
    }
    this.setData({
      id: options.id,
      type: options.type
    });
    this.getGoodDetail();
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