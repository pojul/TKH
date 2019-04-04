// bh_step/pages/publicredpkgnote/publicredpkgnote.js
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
    redPkgs: 0,
    useRedPkg: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRedPacketNum();
  },

  //红包券个数
  getRedPacketNum: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/redPacketNum",
      data: {
      },
      success: function (t) {
        console.log("getRedPacketNum: " + JSON.stringify(t));
        that.setData({
          redPkgs: t.info
        })
      }
    });
  },

  back: function () {
    wx.navigateBack({
    })
  },

  toPublicRedpkg: function(){
    let that = this;
    console.log("toPublicRedpkg: " + wx.getStorageSync("member_type") + "; usepkg: " + that.data.useRedPkg);
    if (that.data.useRedPkg || wx.getStorageSync("member_type") == 2){
      wx.redirectTo({
        url: '/bh_step/pages/publicredpkg/publicredpkg?useRedPkg=' + that.data.useRedPkg
      })
    }else {
      wx.redirectTo({
        url: '/bh_step/pages/member/member'
      })
    }
  },

  toInviteFriend: function () {
    wx.navigateTo({
      url: '/bh_step/pages/invitefriend/invitefriend',
    })
  },

  checkboxChange: function (e) {
    if (e.detail.value != null && e.detail.value.length > 0 &&
      e.detail.value[0] == 'cbname'){
        this.setData({
          useRedPkg: true
        })
    }else{
      this.setData({
        useRedPkg: false
      })
    }
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