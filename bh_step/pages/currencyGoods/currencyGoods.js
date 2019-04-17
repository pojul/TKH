var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var that, app = getApp();

function goods(i) {
    _tools2.default.request({
        method: "get",
        url: "entry/wxapp/goods",
        data: {
            token: wx.getStorageSync("token"),
            id: i.data.id
        },
        success: function(t) {
            2 != t.info.goods.exchange_type && 3 != t.info.goods.exchange_type || wx.navigateTo({
                url: "../goods/goods?id=" + i.data.id
            }), wx.setNavigationBarTitle({
                title: t.info.goods.goods_name
            });
            for (var e = t.info.goods.invitation_list ? t.info.goods.invitation_list.length - 1 : 1, o = 0; o < t.info.goods.invitation_number; o++) e < o && (t.info.goods.invitation_list[o] = {
                member: {
                    nickname: "待邀请",
                    head: i.data.img_url + "/waitAdd.png"
                }
            });
            console.log(t.info.goods.invitation_list), i.setData(t.info);
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
        buyers: [],
        indicatorDots: !1,
        vertical: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        isScrollY: !0,
        current: 0,
        total: 0,
        isShowDialog: !1,
        isShowALLFriend: !1,
        goods: {},
        stepDetail: {},
        item: {},
        userLimitVO: {},
        oemType: "",
        oemId: "",
        productId: "",
        orderId: "",
        isEnoughCoin: !1,
        myCoin: 0,
        isShowInfo: !1,
        needToGetUserInfo: !1,
        authorizedUserInfo: {
            type: Boolean
        },
        isIphoneX: !1,
        isIphone: !1,
        from: "",
        isShowEmpty: !1,
        bgimage: "",
        baseImageUrl: getApp().baseImageUrl,
    },
    onLoad: function(t) {
        var e = app.siteInfo.siteroot.replace(/app\/index.php/, "") + app.img_url;
        this.setData({
            img_url: e
        }), this.setData({
            bgimage: app.img_url + "/step2gift/openFriend.png",
            waitAdd: e + "/waitAdd.png"
        }), (that = this).data.id = t.id;
        
        _tools2.default.request({
          method: "get",
          url: "entry/wxapp/goodsMembers",
          data: {
              token: wx.getStorageSync("token"),
              goods_id: t.id,
              p_size: 6
          },
          success: function(t) {
            
          	that.setData({
          		buyers: t.info.order,
              buyer_total: t.info.total
          	})
          	console.log(t)
//            $this.setData(t.info);
          }
      });
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
    swiperchange: function(t) {
        this.setData({
            current: t.detail.current
        });
    },
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
        return console.log("bh_step/pages/index/index?share_tpye=4&parent_id=" + that.data.member_id + "&goods_id=" + that.data.id), 
        {
            title: "我在用[微信步数]换好礼,100%可领",
            imageUrl: that.data.goods.cover_image,
            path: "bh_step/pages/index/index?share_tpye=4&parent_id=" + that.data.member_id + "&goods_id=" + that.data.id
        };
    },
    triggerALLFriend: function() {
        var t = !this.data.isShowALLFriend;
        if (t) var e = app.img_url + "/step2gift/packupFriend.png"; else e = app.img_url + "/step2gift/openFriend.png";
        this.setData({
            isShowALLFriend: t,
            bgimage: e
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