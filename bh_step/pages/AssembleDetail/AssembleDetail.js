// bh_step/pages/AssembleDetail/AssembleDetail.js
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
    baseImageUrl: getApp().baseImageUrl,
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
        /*console.log("getGoodDetail")
        var article = "<p style='font-size:80px';>1元红包</p><div style='width:100%';><img src='https://img04.sogoucdn.com/app/a/07/86275e21eb32304a3ce9919d3a6361ec' style='width:100%;display: flex;'></img></div><img src='https://img01.sogoucdn.com/app/a/100520020/ab7c5f92bc5d8358c9b768921f8b731b' style='width:20px;'></img><img src='https://img04.sogoucdn.com/app/a/07/86275e21eb32304a3ce9919d3a6361ec' style='width:100px;'></img>";*/
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    });
  },

  getGroupRule: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/groupRule",
      data: {},
      success: function (t) {
         var rules = t.info;
         WxParse.wxParse('rules', 'html', rules, that, 5);
      }
    });
  },

  showRulesDialog: function (e) {
    this.setData({
      showRules: e.currentTarget.dataset.show
    })
  },

  assemble: function () {
    if (this.data.goodDetail.inventory <= 0){
      this.showToast('该商品已售完');
    }
    wx.redirectTo({
      url: '/bh_step/pages/checkOrderAssemble/checkOrderAssemble?type=0&goodid=' + this.data.goodid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.goodid || options.goodid < 0){
      this.showToast('该商品不存在');
      wx.navigateBack({});
    }
    this.setData({
      goodid: options.goodid
    });
    this.getGoodDetail();
    this.getGroupRule();
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