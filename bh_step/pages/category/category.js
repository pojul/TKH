var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var $this, app = getApp();

Page({
    data: {
        share_text: "",
        share_image: "",
        id: 0
    },
    onLoad: function(t) {
        this.data.id = t.id, this.setData({
            img_url: app.siteInfo.siteroot.replace(/app\/index.php/, "") + app.img_url
        }), $this = this;
    },
    onReady: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/config",
            data: {
                token: wx.getStorageSync("token"),
                key: "xcx_title,share_text,share_image"
            },
            success: function(t) {
                $this.setData(t.info);
            }
        });
    },
    onShow: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/category",
            data: {
                token: wx.getStorageSync("token"),
                id: $this.data.id
            },
            success: function(t) {
                $this.setData(t.info), $this.setData({
                    data: t.info
                });
            }
        });
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
    advjump: function() {
        2 == $this.data.data.advertisement.type ? wx.navigateTo({
            url: $this.data.data.advertisement.path,
            fail: function(t) {
                console.log($this.data.data.advertisement.path), wx.switchTab({
                    url: $this.data.data.advertisement.path
                });
            }
        }) : wx.navigateToMiniProgram({
            appId: $this.data.data.advertisement.appid,
            path: $this.data.data.advertisement.path,
            success: function(t) {
                console.log("success");
            },
            fail: function(t) {
                wx.showModal({
                    title: "",
                    content: t.errMsg,
                    showCancel: !1
                });
            }
        });
    },
    goodsDetails: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.etype, i = 2 == a || 3 == a ? "../goods/goods?id=" : "../currencyGoods/currencyGoods?id=";
        wx.navigateTo({
            url: i + e
        });
    }
});