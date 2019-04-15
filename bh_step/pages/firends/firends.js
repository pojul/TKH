var that, tools = require("../../../util/tools.js");

function imlist(a) {
    tools.request({
        method: "get",
        url: "entry/wxapp/friends",
        data: {
            token: wx.getStorageSync("token"),
            p: a.data.p
        },
        success: function(t) {
            var e = t.info.firends;
            1 < a.data.p && (e = a.data.firends.concat(e)), a.setData({
                firends: e
            }), t.info.firends.length < 10 && a.setData({
                isover: !0
            });
        }
    });
}

Page({
    data: {
        p: 1,
        isover: !1,
        share_text: "",
        share_image: "",
        baseImageUrl: getApp().baseImageUrl,
    },
    onLoad: function(t) {
        imlist(that = this);
    },
    onReady: function() {
        tools.request({
            method: "get",
            url: "entry/wxapp/config",
            data: {
                token: wx.getStorageSync("token"),
                key: "xcx_title,share_text,share_image"
            },
            success: function(t) {
                wx.setNavigationBarTitle({
                    title: t.info.xcx_title
                }), that.setData(t.info);
            }
        });
    },
    onShow: function() {},
    advjump: function(t) {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.isover || (this.data.p += 1, imlist(this));
    },
    onShareAppMessage: function() {
        return console.log("bh_step/pages/index/index?share_tpye=1&parent_id=" + that.data.member_id), 
        {
            title: that.data.share_text,
            imageUrl: that.data.share_image,
            path: "bh_step/pages/index/index?share_tpye=1&parent_id=" + that.data.member_id
        };
    },
    more: function(t) {
        that.data.p += 1, imlist(that);
    }
});