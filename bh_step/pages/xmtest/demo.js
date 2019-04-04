var Page = require('../../../util/xiaomeng/xmadx_sdk.min.js').xmad(Page).xmPage;

var _tools = require("../../../util/tools.js"),
	_tools2 = _interopRequireDefault(_tools);

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
		
		// 需在xmad.ad中配置⼴告位ID
		xmad: {
			adData: {},
			ad: {
				banner: "请填⼊您的banner⼴告位ID", // 按需引⼊
//				banner: ["请填⼊您的banner⼴告位ID1", "请填⼊您的banner⼴告位ID2"],
				insert: "请填⼊您的插屏⼴告位ID", // 按需引⼊
				fixed: "请填⼊您的悬浮窗⼴告位ID" // 按需引⼊
			}
		}
		// 您的其它数据
		// yourOtherData: {},
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
		return console.log("bh_step/pages/index/index?share_tpye=1&parent_id=" + $this.data.member_id), {
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