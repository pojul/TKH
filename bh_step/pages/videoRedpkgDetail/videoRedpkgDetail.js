// bh_step/pages/videoRedpkgDetail.js
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
    baseImageUrl: getApp().baseImageUrl,
    detail: {},
    userInfo: {},
    showRules: false,
    showJumpDialog: false,
    parent_id: -1,
    tempoptions: {},
  },

  jumpProgress: function () {
    let that = this;
    this.setData({
      showJumpDialog: false
    })
    wx.navigateToMiniProgram({
      appId: 'wx379ea6330aea67cf',
      success(res) {
        that.receiveVideoBag();
      }
    }) 
  },

  receiveVideoBag: function () {
    let that = this;
    let tempdata = {};
    if(that.data.parent_id >= 0){
      tempdata.parent_id = that.data.parent_id;
    }
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/receiveVideoBag",
      data: tempdata,
      success: function (t) {
        that.showToast('领取视频红包成功');
        that.getDetail();
      }
    });
  },

  showJump: function (e) {
    this.setData({
      showJumpDialog: e.currentTarget.dataset.show
    })
  },

  showRulesDialog: function (e) {
    this.setData({
      showRules: e.currentTarget.dataset.show
    })
  },

  showRulesDialog: function (e) {
    this.setData({
      showRules: e.currentTarget.dataset.show
    })
  },

  getDetail: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/videoBag",
      data: {
      },
      success: function (t) {
        that.setData({
          detail: t.info
        });
        var rules = t.info.bag_rule.bag_description;
        WxParse.wxParse('rules', 'html', rules, that, 5);
      }
    });
  },

  getUserInfo: function () {
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
        });
      }
    });
  },

  toVideoRedpkgs: function () {
    wx.navigateTo({
      url: '/bh_step/pages/cashRedpkg/cashRedpkg'
    })
  },

  authorize: function (e) {
    console.log("authorize---->" + e.detail.authorize);
    if (e.detail.authorize) {
      this.onLoad(this.data.tempoptions);
    }
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
    console.log("onLoad--->" + JSON.stringify(options));
    if (options.parent_id && options.parent_id>=0){
      this.setData({
        parent_id: options.parent_id
      })
    }
    this.setData({
      tempoptions: options
    })
    this.getUserInfo();
    this.getDetail();
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
    let that = this;
    return {
      title: '领取视频红包',
      path: '/bh_step/pages/videoRedpkgDetail/videoRedpkgDetail?parent_id=' + wx.getStorageSync("member_id")
    }
  }
})