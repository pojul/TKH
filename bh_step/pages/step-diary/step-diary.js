var _Page, _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

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

function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var i = e(require("./modules/base-canvas-palette.js")), n = e(require("../../../util/wx-promisify/wx-promisify.js")), d = e(require("./modules/handle-create-img.js")), h = ((0, 
n.default)(wx.getSetting), 0), p = 0;

function load(e) {
    var t = e.data.image[e.data.posterIndex];
    e.setData({
        posterInfo: t
    }), e.data.posterIndex == e.data.l ? e.data.posterIndex = 0 : e.data.posterIndex++;
}

Page((_defineProperty(_Page = {
    data: {
        requestAuthType: 0,
        isShowOpensettingDialog: !1,
        posterIndex: 0,
        userInfo: null,
        date: "",
        stepNum: 0,
        qrcodeUrl: "",
        defautlQrcode: "",
        posterInfo: {},
        template: {},
        xcx_title: "",
        index: 0,
        l: 4
    },
    onLoad: function(e) {
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
            success: function(e) {
                $this.setData(e.info);
            }
        }), _tools2.default.request({
            method: "get",
            url: "entry/wxapp/shareImage",
            data: {
                token: wx.getStorageSync("token")
            },
            success: function(e) {
                $this.data.l = e.info.image.length - 1, $this.setData(e.info), load($this);
            }
        });
    },
    handleSeeNextBtnClick: function() {
        load($this);
    },
    onImgOK: function(e) {
        console.log(11111), d.default.createImgScuess(this, e);
    },
    imgErr: function(e) {
        console.log(22222), d.default.createImgFail(e);
    },
    handleSaveBtnClick: function() {
        var t = this;
        wx.showLoading({
            title: "正在生成图片",
            mask: !0
        }), this.data.qrcodeUrl ? d.default.doCreateImg(this) : (0, u.default)().then(function(e) {
            t.setData({
                qrcodeUrl: e
            });
        }, function(e) {
            t.imgErr(e);
        });
        try {
            getApp().sensors.track("XMClick", {
                ck_module: "保存图片",
                page: "步数日志"
            });
        } catch (t) {}
    }
}, "handleSaveBtnClick", function() {
    var t = this;
    wx.showLoading({
        title: "正在生成图片",
        mask: !0
    }), this.data.qrcodeUrl ? d.default.doCreateImg(this) : (0, u.default)().then(function(e) {
        t.setData({
            qrcodeUrl: e
        });
    }, function(e) {
        t.imgErr(e);
    });
    try {
        getApp().sensors.track("XMClick", {
            ck_module: "保存图片",
            page: "步数日志"
        });
    } catch (t) {}
}), _defineProperty(_Page, "onShow", function() {}), _defineProperty(_Page, "onHide", function() {}), 
_defineProperty(_Page, "onUnload", function() {}), _defineProperty(_Page, "onPullDownRefresh", function() {}), 
_defineProperty(_Page, "onReachBottom", function() {}), _defineProperty(_Page, "onShareAppMessage", function() {
    return console.log("bh_step/pages/index/index?share_tpye=1&parent_id=" + $this.data.member_id), 
    {
        title: $this.data.share_text,
        imageUrl: $this.data.share_image,
        path: "bh_step/pages/index/index?share_tpye=1&parent_id=" + $this.data.member_id
    };
}), _defineProperty(_Page, "gotoCoinDetail", function() {
    wx.navigateTo({
        url: "../task/task"
    });
}), _defineProperty(_Page, "gotoMyOrder", function() {
    wx.navigateTo({
        url: "../order/order"
    });
}), _defineProperty(_Page, "onGotUserInfo", function() {
    0 < this.data.friends_num && wx.navigateTo({
        url: "../firends/firends"
    });
}), _defineProperty(_Page, "gotoMyIncomeDetail", function() {
    wx.navigateTo({
        url: "../cash/cash"
    });
}), _defineProperty(_Page, "gotoproblem", function() {
    wx.navigateTo({
        url: "../question/question?a=questionList"
    });
}), _defineProperty(_Page, "getUserInfo", function(e) {
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
    var t = e.currentTarget.dataset.index, a = this.data.jump[t];
    2 == a.type ? wx.navigateTo({
        url: a.path,
        fail: function(e) {
            wx.switchTab({
                url: a.path
            });
        }
    }) : wx.navigateToMiniProgram({
        appId: a.appid,
        path: a.path,
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