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
        img_url: ""
    },
    onLoad: function(t) {
        ($this = this).setData({
            img_url: app.siteInfo.siteroot.replace(/app\/index.php/, "") + app.img_url
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
            success: function(t) {
                wx.setNavigationBarTitle({
                    title: t.info.xcx_title
                }), $this.setData(t.info);
            }
        });
    },
    onShow: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/my",
            data: {
                token: wx.getStorageSync("token")
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
    gotoCoinDetail: function() {
        wx.navigateTo({
            url: "../task/task"
        });
    },
    gotoMyOrder: function() {
        wx.navigateTo({
            url: "../order/order"
        });
    },
    onGotUserInfo: function() {
        0 < this.data.friends_num && wx.navigateTo({
            url: "../firends/firends"
        });
    },
    gotoMyIncomeDetail: function() {
        wx.navigateTo({
            url: "../cash/cash"
        });
    },
    gotoproblem: function() {
        wx.navigateTo({
            url: "../question/question?a=questionList"
        });
    },
    getUserInfo: function(t) {
        "getUserInfo:ok" == t.detail.errMsg ? _tools2.default.request({
            method: "get",
            url: "entry/wxapp/register",
            data: {
                token: wx.getStorageSync("token"),
                encryptedData: t.detail.encryptedData,
                iv: t.detail.iv
            },
            success: function(t) {
                $this.onShow();
            }
        }) : console.log("用户拒绝了");
    },
    advjump: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.jump[e];
        2 == a.type ? wx.navigateTo({
            url: a.path,
            fail: function(t) {
                wx.switchTab({
                    url: a.path
                });
            }
        }) : wx.navigateToMiniProgram({
            appId: a.appid,
            path: a.path,
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
    }
});