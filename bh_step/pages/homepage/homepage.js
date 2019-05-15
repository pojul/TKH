// bh_step/pages/homepage/homepage.js

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
    recentVisitors: [],
    currentDetail: 0,
    dynamics: [],
    dynamicsPage: 1,
    userInfo: {},
    memberId: -1,
    ownerMemberId: -1,

    memberId: -1,
    ownerMemberId: -1,
    hasMoredynamics: true, 
    baseImageUrl: getApp().baseImageUrl,
  },

  setCurrentDetail: function (event) {
    this.setData({
      currentDetail: event.currentTarget.dataset.current
    })
  },

  getUserInfo: function (memberId){
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

  followOperate: function () {
    if (this.data.userInfo.follow_status){
      this.canclefollow();
    }else{
      this.followUser();
    }
  },

  followUser: function() {
    wx.showLoading({
      title: '请求中',
      mask: true
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/follow",
      data: {
        follow_member_id: that.data.memberId
      },
      success: function (t) {
        wx.hideLoading();
        var str = 'userInfo.follow_status';
        that.setData({
          [str]: true
        })
      },
      fail: function (t) {
        wx.hideLoading();
        that.showToast("关注失败");
      }
    });
  },

  canclefollow: function () {
    wx.showLoading({
      title: '请求中',
      mask: true
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/canclefollow",
      data: {
        follow_member_id: that.data.memberId
      },
      success: function (t) {
        wx.hideLoading();
        var str = 'userInfo.follow_status';
        that.setData({
          [str]: false
        })
      },
      fail: function (t) {
        wx.hideLoading();
        that.showToast("取消关注失败");
      }
    });
  },

  getViewUsersList: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/memberViewList",
      data: {
        view_member_id: that.data.memberId
      },
      success: function (t) {
        that.setData({
          recentVisitors: t.info.view_member_list
        })
      }
    });
  },

  getPostList: function () {
    if (!this.data.hasMoredynamics){
      return;
    }
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/memberPostList",
      data: {
        view_member_id: that.data.memberId,
        p_size: 20,
        p: that.data.dynamicsPage
      },
      success: function (t) {
        if (t.info.post_list.length < 20){
          that.setData({
            hasMoredynamics: false
          })
        }
        that.setData({
          dynamics: that.data.dynamics.concat(t.info.post_list),
          dynamicsPage: (that.data.dynamicsPage * 1 + 1)
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

  toPostDetail: function (e) {
    console.log(JSON.stringify(e.currentTarget.dataset.postid));
    wx.navigateTo({
      url: '/bh_step/pages/redpkginfo/redpkginfo?post_id=' + e.currentTarget.dataset.postid,
    })
  },

  toHomePage: function (e) {
    if (e.currentTarget.dataset.memberid == this.data.memberId) {
      return;
    }
    wx.navigateTo({
      url: '/bh_step/pages/homepage/homepage?member_id=' + e.currentTarget.dataset.memberid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      memberId: options.member_id,
      ownerMemberId: wx.getStorageSync("member_id")
    })
    this.getUserInfo(options.member_id);
    this.getViewUsersList();
    this.getPostList();
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
    this.getPostList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})