var _tools = require("../../../util/tools.js"),
	_tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
	return t && t.__esModule ? t : {
		default: t
	};
}

function _defineProperty(t, e, n) {
	return e in t ? Object.defineProperty(t, e, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : t[e] = n, t;
}

var $this, app = getApp();

Page({
	data: {
    mask: 0,
		share_text: "",
		share_image: "",
		img_url: "",
		conf: '',
	},
	onLoad: function(t) {
		($this = this).data.img_url = app.siteInfo.siteroot.replace(/app\/index.php/, "") + app.img_url,
			this.setData({
				img_url: $this.data.img_url,
				yundong: $this.data.img_url + "/yundong.png"
			});
	},
	onReady: function() {
		wx.getSystemInfo({
			success: function(t) {
				if("ios" == t.platform) {
					$this.setData({
						isIphone: !0
					}); -
					1 < t.model.indexOf("iPhone X") && $this.setData({
						isIphoneX: !0
					});
				}
			}
		}), _tools2.default.request({
			method: "get",
			url: "entry/wxapp/config",
			data: {
				token: wx.getStorageSync("token"),
				key: "xcx_title,share_text,share_image"
			},
			success: function(t) {
				wx.setNavigationBarTitle({
//					title: t.info.xcx_title
				}), $this.setData(t.info);
			}
      }), _tools2.default.request({
        method: "get",
        url: "entry/wxapp/levelSetting",
        data: {
          token: wx.getStorageSync("token")
        },
        success: function (t) {
          $this.setData({
            conf: t.info
          })
        }
      });
	},
	onShow: function() {
	 
	},
	onHide: function() {},
	onUnload: function() {},
	onPullDownRefresh: function() {},
	onReachBottom: function() {},
  toggleMask: function () {
    this.setData({
      mask: !this.data.mask,
    });
  },

  showTip: function() {
    this.toggleMask();
    
  }
 

});