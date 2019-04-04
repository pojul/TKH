var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var $this, QR = require("../../../util/qrcode.js"), app = getApp();

function qrcode(t) {
    _tools2.default.request({
        method: "get",
        url: "entry/wxapp/voucherDetails",
        data: {
            token: wx.getStorageSync("token"),
            id: t.data.id
        },
        success: function(e) {
            2 == e.info.voucher.status ? wx.navigateTo({
                url: "../voucher/voucher"
            }) : (t.size = t.setCanvasSize(), t.createQrCode(e.info.voucher.content, t.canvasId, t.size.w, t.size.h), 
            $this.setData(e.info), setTimeout(function() {
                qrcode(t);
            }, 3e3));
        }
    });
}

Page({
    data: {
        share_text: "",
        share_image: "",
        img_url: "",
        headtxt: "优惠券二维码",
        qrcStr: "",
        qrcPhld: "u=1001",
        maskHidden: !0,
        imagePath: "",
        id: 0
    },
    canvasId: "qrcCanvas",
    onLoad: function(e) {
        ($this = this).data.id = e.id, this.setData({
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
        }), qrcode(this);
    },
    onShow: function() {},
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
    setCanvasSize: function() {
        var e = {};
        try {
            var t = wx.getSystemInfoSync(), a = t.windowWidth / (750 / 686), o = a;
            e.w = a, e.h = o;
        } catch (e) {
            console.log("获取设备信息失败" + e);
        }
        return e;
    },
    createQrCode: function(e, t, a, o) {
        QR.api.draw(e, t, a, o);
    }
});