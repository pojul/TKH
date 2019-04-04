// bh_step/pages/collarmoney/collarmoney.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    progress: 60,
    windowHeight: 0,
    windowWidth: 0,
    scollHeight: 0,
    joins: [
      {}, {}, {}, {}, {}, {}, {}, {}
    ]
  },

  loadMore: function () {
    console.log("====>loadMore");
  },

  getScreenHeight: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        });
        that.getLeftHeight();
      }
    });
  },

  getLeftHeight: function () {
    var that = this;
    var query = wx.createSelectorQuery();
    query.select('.top-view').boundingClientRect()
    query.exec(function (res) {
      let tempScollHeight = that.data.windowHeight - res[0].height - 100 / 750 * that.data.windowWidth;
      that.setData({
        scollHeight: tempScollHeight
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var systemInfo = wx.getSystemInfoSync();
    // var leftRpx = 
    //var px = rpx / 750 * systemInfo.windowWidth; 
    this.getScreenHeight();
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
  /*onShareAppMessage: function () {

  },*/

  onShareAppMessage: function (res) {
    return {
      title: '哈根达斯冰激凌5折特惠',
      imageUrl: 'http://h.hiphotos.baidu.com/image/h%3D300/sign=735d3740c2bf6c81e8372ae88c3fb1d7/962bd40735fae6cd9456784901b30f2442a70f3c.jpg',
      success: (res) => {
      },
      fail: (res) => {
      }
    }
  },
})