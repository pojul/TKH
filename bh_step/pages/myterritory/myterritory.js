// bh_step/pages/myterritory/myterritory.js

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
    territorys: [],
    privileges: [{
        title: '领地唯一显示',
        note: '在领地内显示你的头像，领地内所有用户都能看到你'
      },
      {
        title: '专属城市公告',
        note: '领地界面有领主公告牌，可以任意设置展示内容'
      },
      {
        title: '领地红包分红',
        note: '即时享有领地内抢红包金额的1%'
      },
      {
        title: '领地增值收益',
        note: '领地被下一位领主购买后，获得领地价格涨幅的30%'
      },
    ],
    showPay: false,
    payMoney: 0,
    payTerritoryId: -1,
  },

  showPay: function(e) {
    this.setData({
      payMoney: this.data.territorys[e.currentTarget.dataset.index].price,
      showPay: e.currentTarget.dataset.show,
      payTerritoryId: this.data.territorys[e.currentTarget.dataset.index].id
    })
  },

  checkPay: function() {
    wx.showLoading({
      title: '支付中',
      mask: !0
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/payTerritory",
      data: {
        territory_id: that.data.payTerritoryId,
        token: wx.getStorageSync("token")
      },
      success: function(t) {
        wx.hideLoading();
        that.wexinPay(t.info.pay_data, that);
      },
      fail(res) {
        wx.hideLoading();
        that.showToast("支付失败");
      }
    });
  },

  wexinPay: function (data, that) {
    //var that = this;
    wx.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: data.signType,
      paySign: data.paySign,
      success: function(res) {
        that.getMyTerritory();
      },
      fail: function(res) {
        that.showToast("支付失败");
      }
    })
  },

  getMyTerritory: function() {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/myTerritory",
      data: {},
      success: function(t) {
        that.setData({
          territorys: t.info
        })
      }
    });
  },

  toLordtradinghall: function() {
    wx.navigateTo({
      url: '/bh_step/pages/lordtradinghall/lordtradinghall'
    })
  },

  toTerritoryIncom: function (e) {
    console.log("toTerritoryIncom----?" + JSON.stringify(e))
    wx.navigateTo({
      url: '/bh_step/pages/territoryincome/territoryincome?territory_id=' + e.currentTarget.dataset.territoryid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMyTerritory();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})