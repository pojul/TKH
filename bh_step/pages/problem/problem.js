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
        share_image: ""
    },
    onLoad: function(t) {
        $this = this;
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
        }), _tools2.default.request({
            method: "get",
            url: "entry/wxapp/problem",
            data: {
                token: wx.getStorageSync("token")
            },
            success: function(t) {
                $this.setData(t.info);
            }
        });
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
    gotoCoinDetail: function() {
        wx.navigateTo({
            url: "../task/task"
        });
    }
});