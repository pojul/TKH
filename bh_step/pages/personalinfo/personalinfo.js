// bh_step/pages/personalinfo/personalinfo.js

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
    showDatePicker: false,
    showAreaPicker: false,
    province: '',
    city: '',
    area: '',
    id: -1,
    userInfo: {},
  },

  sureSelectAreaListener: function (e) {
    var that = this;
    that.setData({
      showAreaPicker: false,
      province: e.detail.currentTarget.dataset.province,
      city: e.detail.currentTarget.dataset.city,
      area: e.detail.currentTarget.dataset.area
    })
  },

  showDatePickView: function (options) {
    this.setData({
      showDatePicker: true
    })
  },

  chooseAddress: function () {
    this.setData({
      showAreaPicker: true
    })
  },

  getUserInfo: function (memberId) {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/userInfo",
      data: {
        view_member_id: memberId
      },
      success: function (t) {
        that.setData({
          userInfo: t.info.userInfo
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
    this.setData({
      id: wx.getStorageSync("member_id")
    })
    if (!this.data.id || this.data.id<0){
      this.showToast("数据错误");
      wx.navigateBack({
        delta: 1,
      });
      return;
    }
    this.getUserInfo();
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