// bh_step/pages/checkOrderAssemble/checkOrderAssemble.js
var WxParse = require('../../component/wxParse/wxParse.js');

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
    showRules: false,
    type: -1, //0: check order;1: order detail;2: invited order
    goodid: -1,
    goodDetail: {},
    groupid: -1,
    orderid: -1, 
    showPay: false,
    orderDetail: {},
    userInfo: {},
    setInter: '',
    tempoptions: {},
    baseImageUrl: getApp().baseImageUrl,
    isMember: false,
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

  checkOrder: function () {
    this.setData({
      showPay: true
    })
  },

  checkPay: function (e) {
    wx.showLoading({
      title: '支付中',
      mask: !0
    })
    var that = this;
    let params = { goods_id: that.data.goodid};
    if (that.data.type == 2 && that.data.groupid >= 0){
      params = {
        goods_id: that.data.goodid,
        group_id: that.data.groupid
      };
    }
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/confirmGroupOrder",
      data: params,
      success: function (t) {
        wx.hideLoading();
        that.wexinPay(t.info.pay_data, t.info.share_type, t.info.order_id);
      },
      fail(res) {
        wx.hideLoading();
        that.showToast("支付失败");
      }
    });
  },

  wexinPay: function (data, share_type, order_id) {
    var that = this;
    wx.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: data.signType,
      paySign: data.paySign,
      success: function (res) {
        that.showToast('支付成功');
        that.setData({
          type: 1,
          orderid: order_id,
          shareType: share_type
        })
        that.getOrderDetail();
      },
      fail: function (res) {
        that.showToast("支付失败");
      }
    })
  },

  getGroupRule: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/groupRule",
      data: {},
      success: function (t) {
        var rules = t.info;
        WxParse.wxParse('rules', 'html', rules, that, 5);
      }
    });
  },

  toMoreGood: function () {
    wx.switchTab({
      url: '/bh_step/pages/goodsconvert/goodsconvert?currentGoods=5',
    })
  },

  showRulesDialog: function (e) {
    this.setData({
      showRules: e.currentTarget.dataset.show
    })
  },

  getOrderDetail: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/groupMember",
      data: {
        order_id: that.data.orderid
      },
      success: function (t) {
        if (that.data.type == 2) {
          for (let i = 0; i<t.info.group_member.length;i++) {
            if (wx.getStorageSync("member_id") == t.info.group_member[i].member_id){
              that.setData({
                type: 1
              })
            }
          }
        }
        for (let i = 0; i < t.info.group_member.length; i++) {
          if (wx.getStorageSync("member_id") == t.info.group_member[i].member_id) {
            that.setData({
              isMember: true
            })
          }
        }
        if (that.data.type == 1) {
          wx.setNavigationBarTitle({
            title: '订单详情'
          })
        }
        that.setData({
          orderDetail: t.info,
          groupid: t.info.group_info.group_id,
          orderid: t.info.group_info.id
        });
        if (that.data.orderDetail.group_info.is_complete == 1){
          that.startCountDown();
        }
      }
    });
  },

  getGood: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/receiveGood",
      data: {},
      success: function (t) {
        that.showToast(t.info);
        if (t.status == 1){
          that.data.orderDetail.group_info.is_complete = 3;
          // that.setData({
          //   orderDetail: that.data.orderDetail
          // })
          that.getOrderDetail();
        }
      }
    });
  },

  startCountDown: function () {
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        if (that.data.orderDetail.group_info.expire_time.sec > 0){
          that.data.orderDetail.group_info.expire_time.sec = that.data.orderDetail.group_info.expire_time.sec-1;
        }else{
          if (that.data.orderDetail.group_info.expire_time.min > 0){
            that.data.orderDetail.group_info.expire_time.sec = 59;
            that.data.orderDetail.group_info.expire_time.min = that.data.orderDetail.group_info.expire_time.min -1
          }else{
            if (that.data.orderDetail.group_info.expire_time.hour > 0){
              that.data.orderDetail.group_info.expire_time.sec = 59;
              that.data.orderDetail.group_info.expire_time.min = 59;
              that.data.orderDetail.group_info.expire_time.hour = that.data.orderDetail.group_info.expire_time.hour - 1;
            } else {
              that.endCountDown();
              that.data.orderDetail.group_info.is_complete = 4;
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

  recGood: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/receiveGood",
      data: {
        order_id: that.data.orderid
      },
      success: function (t) {
        that.data.orderDetail.group_info.is_complete = 3,
          // that.setData({
          //   orderDetail: that.data.orderDetail
          // })
        that.showToast('领取成功');
        that.getOrderDetail();
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync("has_login") != 2) {
      wx.redirectTo({
        url: '/bh_step/pages/authorize/authorize?path=/bh_step/pages/checkOrderAssemble/checkOrderAssemble&opt=' + JSON.stringify(options)
      })
      return;
    }
    console.log(JSON.stringify(options));
    if (!options.type || options.type < 0){
      this.showToast("数据错误");
      wx.navigateBack({});
      return;
    }
    if (!options.goodid || options.goodid < 0) {
      this.showToast("数据错误");
      wx.navigateBack({});
      return;
    }
    if (options.type != 0 && !options.orderid && options.orderid < 0){
      this.showToast("数据错误");
      wx.navigateBack({});
      return;
    }
    this.setData({
      goodid: options.goodid,
      type: options.type,
      groupid: (!options.groupid ? -1 : options.groupid),
      orderid: (!options.orderid ? -1 : options.orderid),
      tempoptions: options
    });
    this.getGoodDetail();
    this.getGroupRule();
    if (this.data.orderid >= 0){
      this.getOrderDetail();
    }
    this.getUserInfo();
  },

  authorize: function (e) {
    console.log("authorize---->" + e.detail.authorize);
    if (e.detail.authorize){
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
    var that = this;
    console.log('onShareAppMessage---->');
    return {
      title: that.data.goodDetail.goods_name,
      path: '/bh_step/pages/checkOrderAssemble/checkOrderAssemble?type=2&goodid=' + that.data.goodid + '&orderid=' + that.data.orderid + '&parent_id=' + wx.getStorageSync("member_id")
    }
  }
})