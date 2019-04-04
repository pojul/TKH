var that, tools = require("../../../util/tools.js");
var app = getApp();
function imlist(that) {
  tools.request({
    method: "get",
    url: "entry/wxapp/friendCurrencyLog",
    data: {
      token: wx.getStorageSync("token"),
      p:that.data.p
    },
    success: function (t) {
      var e = t.info.logs;
      1 <that.data.p && (e =that.data.logs.concat(e)),that.setData({
         logs: e
      }), t.info.logs.length < 10 &&that.setData({
        isover: !0
      });
    }
  });
}

function friendlist(a) {
  tools.request({
    method: "get",
    url: "entry/wxapp/friends",
    data: {
      token: wx.getStorageSync("token"),
      p: a.data.p_friends
    },
    success: function (t) {
      var e = t.info.firends;
      1 < a.data.p_friends && (e = a.data.firends.concat(e)), a.setData({
        firends: e
      }), t.info.firends.length < 10 && a.setData({
        isover_friends: !0
      });
    }
  });
}

Page({
  data: {
    remind: 0,
    mask: 0,
    p: 1,
    p_friends: 1,
    img_url: "",
    isover: !1,
    isover_friends: !1,
    share_text: "",
    share_image: "",

    logs: [],
    firends: [],

    proxy1_num: 0,
    proxy2_num: 0,
    currency_from_agent: 0,
    member: 0,

    rolling_notice: [
      "小雨邀请了 66 人，累计赚了 134.52 元",
      "清梦邀请了 87 人，累计赚了 188.38 元",
      "万花筒邀请了 43 人，累计赚了 34.21 元",
      "轻竹邀请了 123 人，累计赚了 214.88 元",
      "星河邀请了 22 人，累计赚了 54.67 元",
      "悠悠桃花香邀请了 17 人，累计赚了 32.98 元",
      "入梦寻君邀请了 68 人，累计赚了 165.89 元",
      "浅笑心柔邀请了 218 人，累计赚了 334.33 元",
      "雾里看花邀请了 76 人，累计赚了 88.87 元",
      "追梦青春邀请了 189 人，累计赚了 267.76 元",
      "柠檬国度邀请了 315 人，累计赚了 509.18 元",
      "生如夏花邀请了 18 人，累计赚了 36.95 元",
      "再见艳阳天邀请了 298 人，累计赚了 434.56 元",
      "三生路邀请了 91 人，累计赚了 187.15 元",
      "陌生人邀请了 31 人，累计赚了 89.91 元",
      "农村卡哇伊邀请了 286 人，累计赚了 434.19 元",
      "旧知己邀请了 56 人，累计赚了 111.23 元",
      "佐手写爱邀请了 76 人，累计赚了 125.46 元",
      "来日方长邀请了 156 人，累计赚了 397.70 元",
      "相對自由邀请了 98 人，累计赚了 163.09 元"
    ]
  },
  onLoad: function (t) {
    this.setData({
      img_url: app.getSiteImgurl()
    });
    imlist(that = this);

    tools.request({
      method: "get",
      url: "entry/wxapp/friendIndex",
      data: {
        token: wx.getStorageSync("token"),
      },
      success: function (t) {
        that.setData(t.info);
      }
    });
  },
  onReady: function () {
    
    tools.request({
      method: "get",
      url: "entry/wxapp/config",
      data: {
        token: wx.getStorageSync("token"),
        key: "xcx_title,share_text,share_image"
      },
      success: function (t) {
        wx.setNavigationBarTitle({
          title: t.info.xcx_title
        }), that.setData(t.info);
      }
    });

    
  },
  onShow: function () { },
  advjump: function (t) { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () {
    this.data.isover || (this.data.p += 1, imlist(this));
  },

  friendlistBottom: function () {
    this.data.isover_friends || (this.data.p_friends += 1, friendlist(this));
  },

  toggleMask: function () {
    this.setData({
      mask: !this.data.mask,
    });
  },

  showTip: function () {
    this.toggleMask();
    friendlist(this)
  },

  onShareAppMessage: function () {
    var _title = that.data.mask ? '老铁，良心推荐你的[微信步数]换红包神器，咋还不用呢？' : that.data.share_text;
    this.setData({ remind: 0 })
    return console.log("bh_step/pages/index/index?share_tpye=1&parent_id=" + that.data.member_id),
      {
        title: _title,
        imageUrl: that.data.share_image,
        path: "bh_step/pages/index/index?share_tpye=1&parent_id=" + that.data.member_id
      };
  },

  more: function (t) {
    that.data.p += 1, imlist(that);
  },

  moreFriends: function (t) {
    that.data.p_friends += 1, friendlist(that);
  }
});