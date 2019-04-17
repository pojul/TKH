// bh_step/pages/bargaindetail/bargaindetail.js
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
    showRules: false,
    type: -1, //0: 发起砍价 1： 查看订单 2： 邀请砍价
    orderid: -1,
    goodid: -1,
    tempoptions: {},
    userInfo: {},
    goodDetail: {},
    orderDetail: {},
    orderStatusStr: '',
    progress: 0,
    parent_id: -1,
    hasHelp: false,
    bargain_money: -1,
    showHelpDialog: false,
    showRecDialog: false,
  },
  
  showRulesDialog: function (e) {
    this.setData({
      showRules: e.currentTarget.dataset.show
    })
  },

  getGoodDetail: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/groupGoodsDetail",
      data: {
        id: that.data.goodid
      },
      success: function (t) {
        that.setData({
          goodDetail: t.info.group_goods
        })
      }
    });
  },

  getRule: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/bargainRule",
      data: {},
      success: function (t) {
        var rules = t.info;
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
        })
      }
    });
  },

  confirmBarginOrder: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/confirmBarginOrder",
      data: {
        goods_id: that.data.goodid
      },
      success: function (t) {
        that.setData({
          type: 1,
          orderid: t.info.order_id
        })
        that.getOrderDetail();
      }
    });
  },

  getOrderDetail: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/bargainOrderDetail",
      data: {
        order_id: that.data.orderid
      },
      success: function (t) {
        that.setData({
          orderDetail: t.info
        })
        if (that.data.orderDetail.order.is_complete == 1){
          that.startCountDown();
        }
        that.setOrderStatusStr();
        if (that.data.orderDetail.order.is_complete==2 && that.data.type==1){
          that.setData({
            showRecDialog: true
          })
        }
      }
    });
  },

  helpFriend: function () {
    console.log('helpFriend--->' + this.data.hasHelp);
    if (this.data.hasHelp){
      return;
    }
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/bargainShare",
      data: {
        goods_id: that.data.goodid,
        parent_id: that.data.parent_id,
        share_tpye: 6
      },
      success: function (t) {
        that.data.hasHelp = true;
        that.setData({
          showHelpDialog: true,
          bargain_money: t.info.bargain_money
        });
        this.getOrderDetail();
      }
    });
  },

  recGood: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/receiveGood",
      data: {
        order_id: that.data.orderid
      },
      success: function (t) {
        that.data.orderDetail.order.is_complete == 3,
        that.setData({
          showRecDialog: false,
          orderDetail: that.data.orderDetail
        })
        that.showToast('领取成功');
        that.setOrderStatusStr();
      }
    });
  },

  closeHelpDialog: function () {
    this.setData({
      showHelpDialog: false
    })
  },

  closeRecDialog: function () {
    this.setData({
      showRecDialog: false
    })
  },

  setOrderStatusStr: function () {
    if(this.data.orderDetail.order.is_complete == 1){
      this.data.orderStatusStr = '分享好友 帮我砍价';
    } else if (this.data.orderDetail.order.is_complete == 2){
      this.data.orderStatusStr = '该订单已完成';
    } else if (this.data.orderDetail.order.is_complete == 3) {
      this.data.orderStatusStr = '该订单已完成';
    } else if (this.data.orderDetail.order.is_complete == 4) {
      this.data.orderStatusStr = '该订单已过期';
    }
    this.setData({
      orderStatusStr: this.data.orderStatusStr 
    })
  },

  setProgress: function () {
    progress: (orderDetail.total_bargain_money / (orderDetail.total_bargain_money + orderDetail.order.pay_money))
  },

  startCountDown: function () {
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        if (that.data.orderDetail.order.expire_time.sec > 0) {
          that.data.orderDetail.order.expire_time.sec = that.data.orderDetail.order.expire_time.sec - 1;
        } else {
          if (that.data.orderDetail.order.expire_time.min > 0) {
            that.data.orderDetail.order.expire_time.sec = 59;
            that.data.orderDetail.order.expire_time.min = that.data.orderDetail.order.expire_time.min - 1
          } else {
            if (that.data.orderDetail.order.expire_time.hour > 0) {
              that.data.orderDetail.order.expire_time.sec = 59;
              that.data.orderDetail.order.expire_time.min = 59;
              that.data.orderDetail.order.expire_time.hour = that.data.orderDetail.order.expire_time.hour - 1;
            } else {
              that.endCountDown();
              that.data.orderDetail.order.is_complete = 4;
              that.setOrderStatusStr();
            }
          }
        }
        that.setData({
          orderDetail: that.data.orderDetail
        });
      }, 1000);
  },

  endCountDown: function () {
    var that = this;
    clearInterval(that.data.setInter)
  },

  authorize: function (e) {
    console.log("authorize---->" + e.detail.authorize);
    if (e.detail.authorize) {
      this.onLoad(this.data.tempoptions);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad--->" + JSON.stringify(options));
    if (!options.type || options.type < 0) {
      this.showToast("数据错误");
      wx.navigateBack({});
      return;
    }
    if (!options.goodid || options.goodid < 0) {
      this.showToast("数据错误");
      wx.navigateBack({});
      return;
    }
    if (options.type != 0 && !options.orderid && options.orderid < 0) {
      this.showToast("数据错误");
      wx.navigateBack({});
      return;
    }
    if (options.type == 2 && (!options.parent_id || options.parent_id<0) ){
      this.showToast("数据错误");
      wx.navigateBack({});
      return;
    }
    this.setData({
      goodid: options.goodid,
      tempoptions: options,
      parent_id: options.parent_id
    })
    if (this.data.type < 0) {
      this.setData({
        type: options.type
      })
    }
    if (this.data.orderid < 0){
      this.setData({
        orderid: (!options.orderid ? -1 : options.orderid)
      })
    }
    this.getRule();
    this.getUserInfo();
    this.getGoodDetail();
    if (options.type != 0 && options.orderid && options.orderid > 0){
      this.getOrderDetail();
    }
    if (this.data.type==0){
      this.confirmBarginOrder();
    }
    if (options.type == 2 && options.parent_id != wx.getStorageSync("member_id")){
      this.helpFriend();
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
    this.endCountDown();
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
    if (this.data.orderDetail.order.is_complete>1){
      return;
    }
    let that = this;
    return {
      title: that.data.goodDetail.goods_name,
      path: '/bh_step/pages/bargaindetail/bargaindetail?type=2&goodid=' + that.data.goodid + '&parent_id=' + wx.getStorageSync("member_id") + '&orderid=' + that.data.orderid
    }
  }
})