var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var that, app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  	buyers: [],
    img_url: '',
  },

  onLoad: function(t) {
        var e = app.siteInfo.siteroot.replace(/app\/index.php/, "") + app.img_url;
        this.setData({
            img_url: e
        }), (that = this).data.id = t.id;
        
        _tools2.default.request({
          method: "get",
          url: "entry/wxapp/goodsMembers",
          data: {
              token: wx.getStorageSync("token"),
              goods_id: t.id,
              p_size: 50
          },
          success: function(t) {
          	that.setData({
          		buyers: t.info.order
          	})
          	console.log(t)
//            $this.setData(t.info);
          }
      });
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