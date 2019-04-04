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
        url: "entry/wxapp/task",
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
        share_text: "",
        share_image: "",
        img_url: ""
    },
    onLoad: function(t) {
        $this = this;
        var e = app.siteInfo.siteroot.replace(/app\/index.php/, "") + app.img_url;
        this.setData({
            img_url: e,
            task_icon1: e + "/step2gift/task_icon1.png",
            task_icon2: e + "/step2gift/task_icon2.png"
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
        var t = wx.getStorageSync("task");
        (console.log(t), t) ? (2e4 < Date.parse(new Date()) - t.time ? _tools2.default.request({
            method: "get",
            url: "entry/wxapp/taskComplete",
            data: {
                token: wx.getStorageSync("token"),
                task_id: t.id,
                form: 1
            },
            success: function(t2) {
            		wx.showModal({
				            title: "任务完成提示",
				            content: "已完成任务:" + t.id,
				            showCancel: !1,
				            success: function(t) {}
				        });
                load($this);
            }
        }) : wx.showModal({
            title: "温馨提示",
            content: "需要超过20秒才能获得奖励哦",
            showCancel: !1,
            success: function(t) {}
        }), wx.removeStorageSync("task")) : load($this);
    },
    gotoCoinDetail: function() {
        wx.navigateTo({
            url: "../currencylog/currencylog"
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
    bindsuccess: function() {
        var t = e.currentTarget.dataset.id;
        if (0 == e.currentTarget.dataset.is_complete) {
            var a = {
                id: t,
                time: Date.parse(new Date())
            };
            wx.setStorageSync("task", a);
        }
    },
    bindfail: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.complete;
        console.log(e), console.log(a);
    },
    startTask: function(t) {
        var e = t.currentTarget.dataset.id, a = this.data.task[e], o = {
            id: this.data.task[e].id,
            time: Date.parse(new Date())
        };
        0 == a.is_complete && wx.setStorageSync("task", o), wx.navigateToMiniProgram({
            appId: a.appid,
            path: a.path,
            extraData: {},
            envVersion: "release",
            success: function(t) {},
            fail: function(t) {
                wx.removeStorageSync("task"), wx.showModal({
                    title: "",
                    content: t.errMsg,
                    showCancel: !1
                });
            }
        });
    }
});