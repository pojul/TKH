var _Page, _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

var $this, app = getApp();

Page((_defineProperty(_Page = {
    data: {
        share_text: "",
        share_image: "",
        img_url: "",
        index: 0
    },
    onLoad: function(e) {
        ($this = this).data.img_url = app.siteInfo.siteroot.replace(/app\/index.php/, "") + app.img_url, 
        this.setData({
            img_url: app.siteInfo.siteroot.replace(/app\/index.php/, "") + app.img_url,
            banner_url: this.data.img_url + "/20180915215005.jpg",
            no_friends: this.data.img_url + "/no-friends-tip.png"
        });
    },
    bindTabClick: function(e) {
        var t = e.currentTarget.dataset.index;
        this.setData({
            index: t
        });
    },
    onReady: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/rankings",
            data: {
                token: wx.getStorageSync("token")
            },
            success: function(e) {
                $this.setData(e.info);
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    getUserInfo: function(e) {
        "getUserInfo:ok" == e.detail.errMsg ? _tools2.default.request({
            method: "get",
            url: "entry/wxapp/register",
            data: {
                token: wx.getStorageSync("token"),
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv
            },
            success: function(e) {
                $this.onShow();
            }
        }) : console.log("用户拒绝了");
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return console.log("bh_step/pages/index/index?share_tpye=1&parent_id=" + $this.data.menber.id), 
        {
            title: $this.data.share.text,
            imageUrl: $this.data.share.image,
            path: "bh_step/pages/index/index?share_tpye=1&parent_id=" + $this.data.menber.id
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
    tapAdBanner: function() {
        wx.navigateTo({
            url: "../step-diary/step-diary"
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
    }
}, "getUserInfo", function(e) {
    "getUserInfo:ok" == e.detail.errMsg ? _tools2.default.request({
        method: "get",
        url: "entry/wxapp/register",
        data: {
            token: wx.getStorageSync("token"),
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv
        },
        success: function(e) {
            $this.onShow();
        }
    }) : console.log("用户拒绝了");
}), _defineProperty(_Page, "advjump", function(e) {
    var t = e.currentTarget.dataset.index, n = this.data.jump[t];
    2 == n.type ? wx.navigateTo({
        url: n.path,
        fail: function(e) {
            wx.switchTab({
                url: n.path
            });
        }
    }) : wx.navigateToMiniProgram({
        appId: n.appid,
        path: n.path,
        success: function(e) {
            console.log("success");
        },
        fail: function(e) {
            wx.showModal({
                title: "",
                content: e.errMsg,
                showCancel: !1
            });
        }
    });
}), _Page));