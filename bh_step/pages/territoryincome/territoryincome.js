// bh_step/pages/territoryincome/territoryincome.js

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
    incomes: [],
    territoryid: -1,
    p: 1,
    hasMore: true,
    isLoading: false,
    income: {},
  },

  getIncomeList: function(){
    if (!this.data.hasMore || this.data.isLoading) {
      return;
    }
    this.setData({
      isLoading: true
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/myTerritoryIncome",
      data: {
        area_id: that.data.territoryid,
        p_size: 20,
        p: that.data.p
      },
      success: function (t) {
        that.setData({
          incomes: that.data.incomes.concat(t.info.myTerritoryIncome),
          income: t.info,
          isLoading: false
        })
        if (t.info.myTerritoryIncome.length < 20) {
          that.setData({
            hasMore: false
          })
          return;
        }
        that.setData({
          p: (that.data.p + 1)
        })
      },
      fail: function (t) {
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
    this.setData({
      territoryid: options.territory_id
    })
    this.getIncomeList();
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
    this.getIncomeList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})