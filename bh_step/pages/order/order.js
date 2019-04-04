var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var $this, app = getApp();

function order(t) {
    _tools2.default.request({
        method: "get",
        url: "entry/wxapp/order",
        data: {
            token: wx.getStorageSync("token"),
            p: t.data.p
        },
        success: function(e) {
            t.setData({
                orders: e.info
            });
        }
    });
}

Page(_defineProperty({
    data: {
        tabs: ["选项一", "选项二", "选项三"],
        activeIndex: 1,
        sliderOffset: 0,
        sliderLeft: 0,

        p: 1,
        orderStatus: {
            1: "FA2828",
            2: "FF8E00",
            3: "26BCC5",
            4: "909090"
        },
        share_text: "",
        share_image: ""
    },
    onLoad: function(e) {
        this.setData({
            img_url: app.siteInfo.siteroot.replace(/app\/index.php/, "") + app.img_url
        }), $this = this;

        var that = this;
        wx.getSystemInfo({
          success: function (res) {
            that.setData({
              sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
              sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
            });
          }
        });
    },
    onReady: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/config",
            data: {
                token: wx.getStorageSync("token"),
                key: "xcx_title,share_text,share_image"
            },
            success: function(e) {
                $this.setData(e.info);
            }
        });
    },
    onShow: function() {
        order(this);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return console.log("bh_step/pages/index/index?share_tpye=1&parent_id=" + $this.data.member_id), 
        {
            title: $this.data.share_text,
            imageUrl: $this.data.share_image,
            path: "bh_step/pages/index/index?share_tpye=1&parent_id=" + $this.data.member_id
        };
    },
    nagativeToIndex: function() {
        wx.switchTab({
            url: "/bh_step/pages/goodsconvert/goodsconvert"
        });
    },
    navigateToDetial: function() {
        var e = t.currentTarget.dataset.value;
        wx.navigateTo({
            url: "/bh_step/pages/goods/goods?id=" + e
        });
    },
    navigateToVoucher: function() {
        wx.navigateTo({
            url: "/bh_step/pages/voucher/voucher"
        });
    },
    tabClick: function (e) {
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      });
    },
    copy: function(e) {
        var t = e.currentTarget.dataset.value;
        wx.setClipboardData({
            data: t,
            success: function(e) {
                wx.showToast({
                    title: "复制成功"
                }), o.sensors.track("XMClick", {
                    ck_module: "复制运单号",
                    contentid: "",
                    page: "订单页面"
                });
            }
        });
    }
}, "navigateToDetial", function(e) {
    var t = e.currentTarget.dataset.value, a = e.currentTarget.dataset.etype, o = 2 == a || 3 == a ? "../goods/goods?id=" : "../currencyGoods/currencyGoods?id=";
    wx.navigateTo({
        url: o + t
    });
}));