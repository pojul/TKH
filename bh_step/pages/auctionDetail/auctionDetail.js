// bh_step/pages/auctionDetail/auctionDetail.js
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
    id: -1,
    type: -1, //1: 参与; 2: 助力
    goodDetail: {},
    setInter: '',
    statusInter: '',
    auctionInter: '',
    auctionLeft: 60,
    isFistLoad: true,
    progress: 1,
    startTimeStr: '',
    order_id: -1,
    auctionLogs: [],
    parent_id: -1,
    helpFriendInfo: {},
    showHelpNoteDialog: false,
    showHelpDialog: false,
    tempoptions: {},
  },

  toRulesDetail: function () {
    wx.navigateTo({
      url: '/bh_step/pages/bystepRules/bystepRules?type=' + 2
    })
  },

  auctionApply: function () {
    wx.showLoading({
      title: '报名中',
      mask: !0
    });
    let that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/auctionApply",
      data: {
        goods_id: that.data.id
      },
      success: function (t) {
        wx.hideLoading();
        that.data.goodDetail.order.status = 1;
        that.setData({
          order_id: t.info.order_id,
          goodDetail: that.data.goodDetail
        });
      },
      fail(res) {
        wx.hideLoading();
        that.showToast("报名失败");
      }
    });
  },

  getGoodDetail: function () {
    let that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/auctionDetail",
      data: {
        id: that.data.id
      },
      success: function (t) {
        that.setData({
          goodDetail: t.info 
        });
        that.setStatus(t.info);
        console.log('getgoodDetail--->' + that.data.isFistLoad);
        if (that.data.isFistLoad){
          that.data.isFistLoad = false;
          that.initData(t);
        }
      }
    });
  },

  getHelpFriendInfo: function () {
    let that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/userInfo",
      data: {
        view_member_id: that.data.parent_id
      },
      success: function (t) {
        that.setData({
          helpFriendInfo: t.info.userInfo
        })
        console.log(that.data.parent_id+"<<<<<<getHelpFriendInfo>>>>>>"+wx.getStorageSync("member_id"))
        if (wx.getStorageSync("member_id") != that.data.parent_id && wx.getStorageSync("member_id") >= 0 &&
          that.data.parent_id >= 0){
          that.helpFriend();
        }
      }
    });
  },

  helpFriend: function () {
    console.log("----->helpFriend");
    let that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/auctionShare",
      data: {
        goods_id: that.data.id,
        parent_id: that.data.parent_id,
        share_tpye: 8
      },
      success: function (t) {
        that.setData({
          type: 1,
          showHelpNoteDialog: true
        })
      }
    });
  },

  closeHelpNoteDialog: function () {
    this.setData({
      showHelpNoteDialog: false,
      showHelpDialog: true,
    })
  },

  closeHelpDialog: function () {
    this.setData({
      showHelpNoteDialog: false,
      showHelpDialog: false,
    })
  },

  authorize: function (e) {
    console.log("authorize>>>>>>>>>>>>" + JSON.stringify(e));
    if (e.detail.authorize) {
      this.onLoad(this.data.tempoptions);
    }
  },

  auctionGood: function () {
    if (this.data.goodDetail.order.total_bid_number < 1){
      this.showToast('你已没有多余出价次数');
      return;
    }
    if (this.data.goodDetail.goods.is_end != 2){
      return;
    }
    wx.showLoading({
      title: '出价中',
      mask: !0
    });
    if (this.data.goodDetail.goods.is_end == 2 && this.data.goodDetail.order.status == 1){
      let that = this;
      _tools2.default.request({
        method: "get",
        url: "entry/wxapp/auctionBid",
        data: {
          id: that.data.id
        },
        success: function (t) {
          wx.hideLoading();
          let tempBidCurrency = 0;
          tempBidCurrency = that.data.goodDetail.order.bid_currency * 1 + that.data.goodDetail.goods.markup_number * 1;
          that.data.goodDetail.order.bid_currency = tempBidCurrency;
          that.data.goodDetail.order.total_bid_number = that.data.goodDetail.order.total_bid_number - 1;
          that.data.goodDetail.goods.max_bid_currency = tempBidCurrency;
          that.setData({
            goodDetail: that.data.goodDetail,
            auctionLeft: 60
          })
        },
        fail(res) {
          wx.hideLoading();
          that.showToast("出价失败");
        }
      });
    }
  },

  getAuctionLog: function () {
    let that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/auctionLog",
      data: {
        id: that.data.id,
        p_size: 3,
        p: 1
      },
      success: function (t) {
        that.setData({
          auctionLogs: t.info.auction_log
        });
      }
    });
  },

  finishAuction: function () {
    console.log('finishAuction--->');
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/auctionEnd",
      data: {
        id: that.data.id
      },
      success: function (t) {
        that.data.goodDetail.goods.is_end = 3;
        that.setData({
          goodDetail: that.data.goodDetail
        });
        that.getAuctionLog();
      },
      fail(res) {
      }
    });
  },

  toMoreAuctionLog: function () {
    wx.navigateTo({
      url: '/bh_step/pages/auctionPriceRecord/auctionPriceRecord?id=' + this.data.id
    })
  },

  initData: function (t) {
    var article = t.info.goods.content;
    WxParse.wxParse('article', 'html', article, this, 5);
    if (t.info.goods.is_end == 1){
      this.startCountDown();
    }
    if (t.info.goods.is_end != 3){
      this.startStatusInter();
    }
    if (t.info.goods.is_end == 2 && t.info.order.status == 1){
      this.startAuctionInter();
    }
    if (this.data.type == 2) {
      this.getHelpFriendInfo();
    }
  },

  setStatus: function (info) {
    let that = this;
    if (info.goods.is_end == 1){
      that.data.progress = 1;
      that.data.startTimeStr = '竞拍开始时间 ' + that.data.goodDetail.goods.start_time;
    } else if (info.goods.is_end == 2){
      that.data.progress = 2;
      that.data.startTimeStr = '如60秒内无人出价，竞拍将提前结束';
      that.setData({
        auctionLeft: info.goods.count_down_time
      })
    }else{
      that.data.progress = 3;
      that.data.startTimeStr = '竞拍已结束';
    }
    that.setData({
      progress: that.data.progress,
      startTimeStr: that.data.startTimeStr
    });
  },

  startStatusInter: function () {
    let that = this;
    //将计时器赋值给setInter
    that.data.statusInter = setInterval(
      function () {
        that.getGoodDetail();
        if (that.data.goodDetail.goods.is_end == 3){
          that.endAllInterval();
          that.getAuctionLog();
        }
      }, 5000);
  },

  startAuctionInter: function () {
    let that = this;
    //将计时器赋值给setInter
    that.data.auctionInter = setInterval(
      function () {
        if (that.data.goodDetail.goods.is_end > 2 || that.data.goodDetail.order.status > 1){
          that.endCountDown();
          return;
        }
        that.setData({
          auctionLeft: (that.data.auctionLeft - 1) < 0 ? 0 : (that.data.auctionLeft - 1)
        });
        if (that.data.auctionLeft <= 0){
          that.finishAuction();
        }
      }, 1000);
  },

  endCountDown: function () {
    clearInterval(this.data.auctionInter);
  },

  startCountDown: function () {
    let that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        if (that.data.goodDetail.goods.start_time_arr.sec > 0) {
          that.data.goodDetail.goods.start_time_arr.sec = that.data.goodDetail.goods.start_time_arr.sec - 1;
        } else {
          if (that.data.goodDetail.goods.start_time_arr.min > 0) {
            that.data.goodDetail.goods.start_time_arr.sec = 59;
            that.data.goodDetail.goods.start_time_arr.min = that.data.goodDetail.goods.start_time_arr.min - 1
          } else {
            if (that.data.goodDetail.goods.start_time_arr.hour > 0) {
              that.data.goodDetail.goods.start_time_arr.sec = 59;
              that.data.goodDetail.goods.start_time_arr.min = 59;
              that.data.goodDetail.goods.start_time_arr.hour = that.data.goodDetail.goods.start_time_arr.hour - 1;
            } else {
              that.endCountDown();
              that.data.goodDetail.goods.is_end = 2;
              if (that.data.goodDetail.order.status == 1) {
                that.startAuctionInter();
              }
            }
          }
        }
        that.setData({
          goodDetail: that.data.goodDetail
        });
      }, 1000);
  },

  endCountDown: function () {
    let that = this;
    clearInterval(that.data.setInter)
  },

  endAllInterval: function () {
    clearInterval(this.data.setInter);
    clearInterval(this.data.statusInter);
    clearInterval(this.data.auctionInter);
  },

  viewResult: function () {
    wx.navigateTo({
      url: '/bh_step/pages/auctionResults/auctionResults?id=' + this.data.id
    })
  },

  toMainDetail: function () {
    wx.switchTab({
      url: '/bh_step/pages/goodsconvert/goodsconvert',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync("has_login") != 2) {
      wx.redirectTo({
        url: '/bh_step/pages/authorize/authorize?path=/bh_step/pages/auctionDetail/auctionDetail&opt=' + JSON.stringify(options)
      })
      return;
    }
    console.log("onLoad>>>>>>>>>>>>" + JSON.stringify(options));
    if(!options.id || options.id < 0){
      this.showToast("数据错误");
      wx.navigateBack({})
      return;
    }
    if (!options.type || options.type < 0) {
      this.showToast("数据错误");
      wx.navigateBack({})
      return;
    }
    if (options.type == 2 && (!options.parent_id || options.parent_id < 0)){
      this.showToast("数据错误");
      wx.navigateBack({})
      return;
    }
    this.endAllInterval();
    this.setData({
      id: options.id,
      tempoptions: options,
      parent_id: options.parent_id
    });
    if (this.data.type!=1){
      this.setData({
        type: options.type
      })
    }
    console.log("member_id>>>>>>>>>>>>" + wx.getStorageSync("member_id"));
    if (wx.getStorageSync("member_id") < 0){
      return;
    }
    this.data.isFistLoad = true;
    this.getGoodDetail();
    this.getAuctionLog();
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
    this.endAllInterval();
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
    console.log("onShareAppMessage--->");
    let that = this;
    return {
      title: that.data.goodDetail.goods_name,
      path: '/bh_step/pages/auctionDetail/auctionDetail?type=2&id=' + that.data.id + '&parent_id=' + wx.getStorageSync("member_id")
    }
  }
})