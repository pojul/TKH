var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var that, app = getApp();

function goods(e) {
    _tools2.default.request({
        method: "get",
        url: "entry/wxapp/goods",
        data: {
            token: wx.getStorageSync("token"),
            id: e.data.id
        },
        success: function(t) {
            1 != t.info.goods.exchange_type && 4 != t.info.goods.exchange_type || wx.navigateTo({
                url: "../currencyGoods/currencyGoods?id=" + e.data.id
            }), wx.setNavigationBarTitle({
                title: t.info.goods.goods_name
            }), e.setData(t.info);
        }
    });
}

function exchangeGoods(e) {
    _tools2.default.request({
        method: "get",
        url: "entry/wxapp/exchange",
        data: {
            token: wx.getStorageSync("token"),
            id: e.data.id
        },
        success: function(t) {
            2 == t.status ? wx.requestPayment({
                timeStamp: t.info.timeStamp,
                nonceStr: t.info.nonceStr,
                package: t.info.package,
                signType: t.info.signType,
                paySign: t.info.paySign,
                success: function(t) {
                    setTimeout(function() {
                        exchangeGoods(e);
                    }, 3e3);
                },
                fail: function(t) {
                    console.log(t);
                }
            }) : wx.navigateTo({
                url: "../order/order"
            });
        }
    });
}

Page({
    data: {
        id: 0,
        isShowALLFriend: !1,
        bgimage: ""
    },
    onLoad: function(t) {
        this.setData({
            img_url: app.siteInfo.siteroot.replace(/app\/index.php/, "") + app.img_url
        }), this.setData({
            bgimage: app.img_url + "/step2gift/openFriend.png"
        }), (that = this).data.id = t.id;
    },
    onReady: function() {
        wx.getSystemInfo({
            success: function(t) {
                if ("ios" == t.platform) {
                    that.setData({
                        isIphone: !0
                    });
                    -1 < t.model.indexOf("iPhone X") && that.setData({
                        isIphoneX: !0
                    });
                }
            }
        });
    },
    onShow: function() {
        goods(that);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    exchange: function() {
        1 != this.data.goods.type || this.data.address ? wx.showModal({
            title: "提示",
            content: "确定要兑换该商品",
            success: function(t) {
                t.confirm ? exchangeGoods(that) : t.cancel && console.log("用户点击取消");
            }
        }) : wx.navigateTo({
            url: "../address/address"
        });
    },
    onReachBottom: function() {},
    setAddress: function() {
        wx.navigateTo({
            url: "../address/address"
        });
    },
    onShareAppMessage: function() {
        return {
            title: "我在用[微信步数]换好礼,100%可领",
            imageUrl: that.data.goods.cover_image,
            path: "bh_step/pages/index/index?share_tpye=3&parent_id=" + that.data.member_id + "&goods_id=" + that.data.id
        };
    },
    swiperchange: function(t) {
        this.setData({});
    },
    triggerALLFriend: function() {
        var t = !this.data.isShowALLFriend;
        if (t) var e = app.img_url + "/step2gift/packupFriend.png"; else e = app.img_url + "/step2gift/openFriend.png";
        this.setData({
            isShowALLFriend: t,
            bgimage: e
        });
    },
    toExplain: function() {
        wx.navigateTo({
            url: "../question/question?a=activity"
        });
    },
    getUserInfo: function(t) {
        if ("getUserInfo:ok" == t.detail.errMsg) {
            t.detail.userInfo;
            _tools2.default.request({
                method: "get",
                url: "entry/wxapp/register",
                data: {
                    token: wx.getStorageSync("token"),
                    encryptedData: t.detail.encryptedData,
                    iv: t.detail.iv
                },
                success: function(t) {
                    goods(that);
                }
            });
        } else console.log("用户拒绝了");
    }
});