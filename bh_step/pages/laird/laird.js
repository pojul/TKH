// bh_step/pages/laird/laird.js
var WxParse = require('../../component/wxParse/wxParse.js');
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
    province: '',
    city: '',
    area: '',
    show: false,
    lordAgreement: "<div></div>",
    showAgreement: false,
    showPay: false,
    terriroty: {},
    terrirotyid: -1,
  },

  loadAgreement: function (e) {
    
  },

  toterritorialrule: function () {
    wx.navigateTo({
      url: '/bh_step/pages/territorialrule/territorialrule',
    })
  },

  showAgreement: function (e) {
    if (this.data.terriroty.status != 1){
      this.showToast("该领地暂不出售");
      return;
    }
    if (wx.getStorageSync("member_type") != 2){
      this.showToast("非会员不能租赁领地");
      return;
    }
    if (this.data.terriroty.id < 0) {
      this.showToast("数据错误");
      return;
    }
    this.setData({
      showAgreement: e.currentTarget.dataset.show,
      showPay: false
    })
  },

  showPay: function (e) {
    this.setData({
      showAgreement: false,
      showPay: e.currentTarget.dataset.show
    })
  },

  toHomePage: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/bh_step/pages/homepage/homepage?member_id=' + that.data.terriroty.now_owner_member_id
    })
  },

  sureSelectAreaListener: function (e) {
    var that = this;
    that.setData({
      show: false,
      province: e.detail.currentTarget.dataset.province,
      city: e.detail.currentTarget.dataset.city,
      area: e.detail.currentTarget.dataset.area
    })
  },

  chooseAddress: function () {
    var that = this;
    that.setData({
      show: true
    })
  },

  checkArea: function (e) {
    this.getTerriroty(e.detail.area.id);
  },

  checkPay: function (e) {
    wx.showLoading({
      title: '支付中',
      mask: !0
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/payTerritory",
      data: {
        territory_id: this.data.terriroty.id,
        token: wx.getStorageSync("token")
      },
      success: function (t) {
        wx.hideLoading();
        that.wexinPay(t.info.pay_data);
      },
      fail(res) {
        wx.hideLoading();
        that.showToast("支付失败");
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
        that.showToast('购买成功'); 
        that.getTerriroty(that.data.terriroty.id);
      },
      fail: function (res) {
        that.showToast("支付失败");
      }
    })
  },

  getTerriroty: function(areaId) {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/terrirotyInfo",
      data: {
        area_id: areaId
      },
      success: function (t) {
        that.setData({
          terriroty: t.info.territory
        })
      }
    });
  },

  getLoadAgreement: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/loadAgreement",
      data: {
      },
      success: function (t) {
        that.setData({
          lordAgreement: t.info
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
    WxParse.wxParse('lordAgreement', 'html', this.data.lordAgreement, this, 5);
    this.setData({
      terrirotyid: options.terriroty_id
    })
    this.getTerriroty(options.terriroty_id);
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