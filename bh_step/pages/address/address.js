var that, _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function address(a) {
    wx.getStorageSync("trd_session");
    _tools2.default.request({
        method: "get",
        url: "entry/wxapp/getAddress",
        data: {
            token: wx.getStorageSync("token")
        },
        success: function(t) {
            var e = t.info;
            0 == e ? wx.chooseAddress({
                success: function(t) {
                    a.setData({
                        consignee: t.userName,
                        tel: t.telNumber,
                        detailAddress: t.provinceName + t.cityName + t.countyName + t.detailInfo
                    });
                }
            }) : a.setData({
                consignee: e.name,
                tel: e.phone,
                detailAddress: e.address
            });
        }
    });
}

Page({
    data: {
        consignee: "",
        tel: "",
        detailAddress: "",
        card: ""
    },
    onLoad: function(t) {
        t.id && (this.data.id = t.id), address(this);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    nameInput: function(t) {
        this.setData({
            consignee: t.detail.value
        });
    },
    telInput: function(t) {
        this.setData({
            tel: t.detail.value
        });
    },
    cardInput: function(t) {
        this.setData({
            card: t.detail.value
        });
    },
    detailInput: function(t) {
        this.setData({
            detailAddress: t.detail.value
        });
    },
    layerclose: function(t) {
        this.setData({
            layer: !1
        });
    },
    submit: function(t) {
        this.setData({
            layer: !0
        });
    },
    btnsubmit: function(t) {
        var e = this;
        e.setData({
            layer: !1
        });
        var a = {}, n = wx.getStorageSync("token"), o = e.data.consignee, s = e.data.tel, i = (e.data.card, 
        e.data.detailAddress);
        "" != o ? "" != s ? "" != i ? (a.token = n, a.formid = t.detail.formId, a.name = o, 
        a.phone = s, a.address = i, _tools2.default.request({
            method: "get",
            url: "entry/wxapp/setAddress",
            data: a,
            success: function(t) {
                wx.navigateBack();
            }
        })) : _tools2.default.showNotice("请填写详细地址") : _tools2.default.showNotice("请填写电话") : _tools2.default.showNotice("请填写收货人");
    }
});