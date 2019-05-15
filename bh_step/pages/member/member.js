// bh_step/pages/member/member.js

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
    showPay: false,
    selectMoney: 0,
    prices: {},
    days: [
      { day: 30 }, { day: 90 }, { day: 365 }
    ],
    postMoney: 0,
    privilegeId: -1,
    memberType: -1,
  },

  showPay: function (e) {
    if (this.data.postMoney <= 0){
      this.showToast("数据错误");
      return;
    }
    this.setData({
      showAgreement: false,
      showPay: e.currentTarget.dataset.show
    })
  },

  getPrivilegeId: function() {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/memberRule",
      data: {
      },
      success: function (t) {
        that.setData({
          privilegeId: t.info.id
        })
      }
    });
  },

  toPrivilegeDetail: function () {
    var that = this;
    wx.navigateTo({
      url: '/bh_step/pages/strategy/strategy?id=' + that.data.privilegeId
    })
  },

  setSelectMoney: function (e) {
    let tempMoney = 0;
    if (e.currentTarget.dataset.select == 0){
      tempMoney = this.data.prices.one_month_member_price;
    } else if (e.currentTarget.dataset.select == 1){
      tempMoney = this.data.prices.three_month_member_price;
    } else if (e.currentTarget.dataset.select == 2) {
      tempMoney = this.data.prices.one_year_member_price;
    }
    this.setData({
      selectMoney: e.currentTarget.dataset.select,
      postMoney: tempMoney
    })
  },

  getMemberPrices: function(e) {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/memberPrice",
      data: {
      },
      success: function (t) {
        that.setData({
          prices: t.info,
          postMoney: t.info.one_month_member_price
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMemberPrices();
    this.getPrivilegeId();

    this.setData({
      memberType: wx.getStorageSync("member_type")
    })
  },

  checkPay: function (e) {
    //console.log("checkPay: " + e.detail.payType);
    wx.showLoading({
      title: '支付中',
      mask: !0
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/buyTuoke",
      data: {
        buy_days: that.data.days[that.data.selectMoney].day,
        token: wx.getStorageSync("token")
      },
      success: function (t) {
        wx.hideLoading();
        that.wexinPay(t.info.pay_data);
      },
      fail(res) {
        wx.hideLoading();
        that.showToast("购买会员失败");
      }
    });
  },

  wexinPay: function (data) {
    var that = this;
    wx.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: data.signType,
      paySign: data.paySign,
      success: function (res) {
        that.showToast('购买会员成功');
        wx.navigateBack({});
        wx.setStorageSync("member_type", 2);
      },
      fail: function (res) {
        that.showToast("支付失败");
      }
    })
  },

  showToast: function (str) {
    wx.showToast({
      title: str,
      icon: 'none',
      duration: 1800,
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