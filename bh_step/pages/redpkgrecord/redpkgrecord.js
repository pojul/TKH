// bh_step/pages/redpkgrecord/redpkgrecord.js

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
    currentTab: 0,
    grabRedPkg: {},
    grabRedPkgs: [],
    giveRedPkg: {},
    giveRedPkgs: [],
    p_garb: 1,
    p_give: 1,
    hasMoreGrabs: true,
    hasMoreGives: true,
    userInfo: {},
  },

  getGrabRedPkgs: function () {
    if (!this.data.hasMoreGrabs){
      return;
    }
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/receiveList",
      data: {
        p_size: 10,
        p: that.data.p_garb
      },
      success: function (t) {
        that.setData({
          grabRedPkg: t.info,
          grabRedPkgs: that.data.grabRedPkgs.concat(t.info.receive_list),
        })
        if (t.info.receive_list.length < 10){
          that.setData({
            hasMoreGrabs: false
          })
          return;
        }
        that.setData({
          p_garb: (that.data.p_garb*1 + 1)
        })
      }
    });
  },

  getGiveRedPkg: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/postCount",
      data: {
        p_size: 10,
        p: that.data.p_garb
      },
      success: function (t) {
        that.setData({
          giveRedPkg: t.info,
        })
      }
    });
  },

  getGiveRedPkgs: function () {
    if (!this.data.hasMoreGives) {
      return;
    }
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/memberPostList",
      data: {
        p_size: 10,
        p: that.data.p_give,
        view_member_id: wx.getStorageSync("member_id")
      },
      success: function (t) {
        that.setData({
          giveRedPkgs: that.data.giveRedPkgs.concat(t.info.post_list),
        })
        if (t.info.post_list.length < 10){
          that.setData({
            hasMoreGives: false
          })
          return;
        }
        that.setData({
          p_give: (that.data.p_give * 1 + 1)
        })
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
        })
      }
    });
  },

  showDelete: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除该红包？',
      success(res) {
        if (res.confirm) {
          that.deletePost(e.currentTarget.dataset.postindex);
        }
      }
    })
  },

  deletePost: function (index) {
    wx.showLoading({
      title: '请求中',
      mask: true
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/deletePost",
      data: {
        post_id: that.data.giveRedPkgs[index].id
      },
      success: function (t) {
        that.data.giveRedPkgs.splice(index, 1);
        that.setData({
          giveRedPkgs: that.data.giveRedPkgs
        })
        wx.hideLoading();
      },
      fail: function (t) {
        wx.hideLoading();
        that.showToast("删除失败");
      }
    });
  },

  toPostDetail: function (e) {
    wx.navigateTo({
      url: '/bh_step/pages/redpkginfo/redpkginfo?post_id=' + e.currentTarget.dataset.postid,
    })
  },

  changeTab: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.tab
    })
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
    this.getGrabRedPkgs();
    this.getGiveRedPkg();
    this.getGiveRedPkgs();
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
    if (this.data.currentTab == 0){
      this.getGrabRedPkgs();
    }else{
      this.getGiveRedPkgs();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})