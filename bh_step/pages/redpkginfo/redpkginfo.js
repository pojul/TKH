// bh_step/pages/redpkginfo/redpkginfo.js

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
    recUsers: [],
    replys: [],
    postDetails: {},
    postid: -1,
    ownerMemberId: -1,
    redpkgStatusStr: '',
    num: 5, //计时器倒计时
    setInter: '',
    replyText: '',
    userInfo: {},
    showSubReply: false,
    replyIndex: -1,
    p: 1,
    hasMoreReplys: true,
    isGetReplys: false,
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

  getPostDetail: function() {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/postDetail",
      data: {
        post_id: that.data.postid
      },
      success: function (t) {
        let tempRedPkgStatus = '红包派完了';
        if (t.info.post_detail.member_money <= 0 && t.info.post_detail.remain_number > 0){
          that.receiveRedPacket();
          tempRedPkgStatus = '5';
        } else if (t.info.post_detail.member_money > 0){
          tempRedPkgStatus = '您抢到了' + t.info.post_detail.member_money + '元红包';
        }

        that.setData({
          postDetails: t.info.post_detail,
          recUsers: t.info.receive_detail,
          redpkgStatusStr: tempRedPkgStatus
        })
      }
    });
  },
  
  receiveRedPacket: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/receiveRedPacket",
      data: {
        post_id: that.data.postid
      },
      success: function (t) {
        let tempRedPkgStatus = '5';
        that.startSetInter();
        var postMoney = 'postDetails.member_money';
        var postLeft = 'postDetails.remain_number';
        that.setData({
          [postMoney]: t.info,
          [postLeft]: that.data.postDetails.remain_number - 1,
          redpkgStatusStr: tempRedPkgStatus
        })
      },
      fail: function (t) {
        that.setData({
          redpkgStatusStr: '抢红包失败'
        })
      }
    });
  },

  startSetInter: function () {
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        var numVal = that.data.num - 1;
        if (that.data.num <= 0) {
          that.endSetInter();
          return;
        }
        that.setData({
          num: numVal,
          redpkgStatusStr: numVal
        });
      }, 1000);
  },

  endSetInter: function () {
    var that = this;
    clearInterval(that.data.setInter)
    that.setData({
      redpkgStatusStr: '您抢到了' + that.data.postDetails.member_money + '元红包'
    })
  },

  toOutLink: function () {
    var that = this;
    if (this.data.postDetails.site_url_link != 'undefined' && this.data.postDetails.site_url_link != null &&
    this.data.postDetails.site_url_link != ''){
      wx.navigateTo({
        url: '/bh_step/pages/outernetlink/outernetlink?url=' + that.data.postDetails.site_url_link
      })
    }
  },
  
  followUser: function () {
    if (this.data.postDetails.is_follow){
      this.cancelFollowUser();
      return;
    }
    wx.showLoading({
      title: '请求中',
      mask: true
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/follow",
      data: {
        follow_member_id: that.data.postDetails.member_id
      },
      success: function (t) {
        wx.hideLoading();
        var str = 'postDetails.is_follow';
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



  cancelFollowUser: function () {
    wx.showLoading({
      title: '请求中',
      mask: true
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/canclefollow",
      data: {
        follow_member_id: that.data.postDetails.member_id
      },
      success: function (t) {
        wx.hideLoading();
        var str = 'postDetails.is_follow';
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

  thumpUpPost: function () {
    if (this.data.postDetails.is_like){
      this.cancelThumpupPost();
      return;
    }
    wx.showLoading({
      title: '请求中',
      mask: true
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/postsLike",
      data: {
        post_id: that.data.postid
      },
      success: function (t) {
        var str = 'postDetails.is_like';
        that.setData({
          [str]: true
        })
      },
      fail: function (t) {
        wx.hideLoading();
        that.showToast("点赞失败");
      }
    });
  },

  cancelThumpupPost: function () {
    wx.showLoading({
      title: '请求中',
      mask: true
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/canclePostLike",
      data: {
        post_id: that.data.postid
      },
      success: function (t) {
        var str = 'postDetails.is_like';
        that.setData({
          [str]: false
        })
      },
      fail: function (t) {
        wx.hideLoading();
        that.showToast("点赞失败");
      }
    });
  },

  toRedpkgReport: function () {
    var that = this;
    if (that.data.postDetails.remain_number > 0){
      this.showToast("红包还未派送完毕，暂不能查看报表");
      return;
    }
    wx.navigateTo({
      url: '/bh_step/pages/redpkgreport/redpkgreport?post_id=' + that.data.postid
    })
  },

  replyTextChange: function (e) {
    this.setData({
      replyText: e.detail.value
    })
  },

  postReply: function () {
    let str = this.data.replyText;
    if (str == ''){
      this.showToast('回复内容不能为空');
      return;
    }
    wx.showLoading({
      title: '请求中',
      mask: true
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/memberComment",
      data: {
        post_id: that.data.postid,
        body: str,
        reply_member_id: wx.getStorageSync('member_id')
      },
      success: function (t) {
        let date = new Date();
        let reply = {
          id: t.info,
          member_id: wx.getStorageSync('member_id'),
          pid: 0,
          body: str,
          create_time: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes(),
          nickname: that.data.userInfo.nickname,
          head: that.data.userInfo.head,
          is_like: false,
        }
        that.data.replys.splice(0, 0, reply);
        that.setData({
          replys: that.data.replys,
          replyText: ''
        })
        wx.hideLoading();
      },
      fail: function (t) {
        wx.hideLoading();
        that.showToast("回复失败");
      }
    });
  },

  showSubPostReply: function (e) {
    this.setData({
      showSubReply: true,
      replyIndex: e.currentTarget.dataset.replyindex
    })
  },

  checkReply: function (e) {
    this.subPostReply(e.detail.text);
  },

  subPostReply: function(str) {
    if (str == '') {
      this.showToast('回复内容不能为空');
      return;
    }
    let replyTop = this.data.replys[this.data.replyIndex];
    wx.showLoading({
      title: '请求中',
      mask: true
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/memberComment",
      data: {
        post_id: that.data.postid,
        body: str,
        pid: that.data.replys[that.data.replyIndex].id,
        reply_member_id: wx.getStorageSync('member_id')
      },
      success: function (t) {
        let date = new Date();
        let reply = {
          id: t.info,
          member_id: wx.getStorageSync('member_id'),
          pid: that.data.replys[that.data.replyIndex].id,
          body: str,
          create_time: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes(),
          nickname: that.data.userInfo.nickname,
          head: that.data.userInfo.head
        }
        if (!that.data.replys[that.data.replyIndex].reply_list){
          that.data.replys[that.data.replyIndex].reply_list = [];
        }
        that.data.replys[that.data.replyIndex].reply_list.splice(0, 0, reply);
        that.setData({
          replys: that.data.replys
        })
        wx.hideLoading();
      },
      fail: function (t) {
        wx.hideLoading();
        that.showToast("回复失败");
      }
    })
  },

  getPostReplys: function(str) {
    if (!this.data.hasMoreReplys || this.data.isGetReplys){
      return;
    }
    this.setData({
      isGetReplys: true
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/postCommentList",
      data: {
        post_id: that.data.postid,
        p_size: 20,
        p: that.data.p
      },
      success: function (t) {
        if (t.info && t.info.length > 0){
          that.setData({
            replys: that.data.replys.concat(t.info),
            p: (that.data.p * 1 + 1)
          })
        }else{
          that.setData({
            hasMoreReplys: false
          })
        }
        that.setData({
          isGetReplys: false
        })
      },
      fail: function (t) {
        that.setData({
          isGetReplys: false
        })
      }
    });
  },

  replyLike: function (e) {
    if (this.data.replys[e.currentTarget.dataset.postindex].is_like){
      this.cancelReplyLike(e.currentTarget.dataset.postindex);
      return;
    }
    wx.showLoading({
      title: '请求中',
      mask: true
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/postCommentLike",
      data: {
        c_id: that.data.replys[e.currentTarget.dataset.postindex].id
      },
      success: function (t) {
        that.data.replys[e.currentTarget.dataset.postindex].is_like = true;
        that.setData({
          replys: that.data.replys
        })
        wx.hideLoading();
      },
      fail: function (t) {
        wx.hideLoading();
        that.showToast("点赞失败");
      }
    });
  },

  cancelReplyLike: function (index) {
    wx.showLoading({
      title: '请求中',
      mask: true
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/canclePostCommentLike",
      data: {
        c_id: that.data.replys[index].id
      },
      success: function (t) {
        that.data.replys[index].is_like = false;
        that.setData({
          replys: that.data.replys
        })
        wx.hideLoading();
      },
      fail: function (t) {
        wx.hideLoading();
        that.showToast("取消点赞失败");
      }
    });
  },

  showDeleteReply: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除该回复？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.deleteReply(e.currentTarget.dataset.postindex);
        }
      }
    })
  },

  deleteReply: function (index) {
    wx.showLoading({
      title: '请求中',
      mask: true
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/delPostComment",
      data: {
        comment_id: that.data.replys[index].id
      },
      success: function (t) {
        that.data.replys.splice(index, 1);
        that.setData({
          replys: that.data.replys
        })
        wx.hideLoading();
      },
      fail: function (t) {
        wx.hideLoading();
        that.showToast("删除回复失败");
      }
    });
  },

  shareRedpkg: function (str) {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/postShareLog",
      data: {
        post_id: that.data.postid
      },
      success: function (t) {
      }
    });
  },

  toRedpkgDetail: function (str) {
    var that = this;
    wx.navigateTo({
      url: '/bh_step/pages/redpkgDetail/redpkgDetail?post_id=' + that.data.postid
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
    if (!options.post_id || options.post_id < 0){
      this.showToast("数据错误");
      wx.navigateBack({
        delta: 1,
      })
      return;
    }
    this.setData({
      postid: options.post_id,
      ownerMemberId: wx.getStorageSync("member_id")
    })
    this.getPostDetail();
    this.getUserInfo();
    this.getPostReplys();
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
    this.getPostReplys();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    this.shareRedpkg();
    return {
      title: that.data.postDetails.title,
      path: '/bh_step/pages/redpkginfo/redpkginfo?post_id=' + that.data.postid,
    }
  }
})