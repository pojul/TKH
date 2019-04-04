var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var $this, app = getApp();

function load(e) {
    _tools2.default.request({
        method: "get",
        url: "entry/wxapp/cash",
        data: {
            token: wx.getStorageSync("token")
        },
        success: function(t) {
            e.setData(t.info);
        }
    });
}

Page({
    data: {
        cash_money: 0,
        share_text: "",
        share_image: ""
    },
    onLoad: function(t) {
        this.setData({
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
                wx.setNavigationBarTitle({
                    title: t.info.xcx_title
                }), $this.setData(t.info);
            }
        });
    },
    onShow: function() {
        load(this);
    },
    bindWithdrawAllClick: function() {
        $this.setData({
            cash_money: this.data.moeny
        });
    },
    bindWithdrawBtnClick: function() {
        var t = parseFloat(this.data.moeny), e = parseFloat(this.data.cash_money);
        t < e ? wx.showToast({
            icon: "none",
            title: "余额不足"
        }) : Number.isNaN(e) || e < $this.data.least_money ? wx.showToast({
            icon: "none",
            title: "最低提现门槛" + $this.data.least_money + "元"
        }) : _tools2.default.request({
            method: "get",
            url: "entry/wxapp/withdrawals",
            data: {
                token: wx.getStorageSync("token"),
                money: e
            },
            success: function(t) {
                wx.showToast({
                    title: "提现成功"
                }), load($this);
            }
        });
    },
    bindKeyInput: function(t) {
        this.data.cash_money = t.detail.value;
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
    }
});