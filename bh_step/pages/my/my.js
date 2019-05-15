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
		share_text: "",
		share_image: "",
		img_url: "",
		isIphoneX: !1,
		addedExp: 0,
    baseImageUrl: getApp().baseImageUrl,
    memberType: 1,
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
					title: t.info.xcx_title
				}), $this.setData(t.info);
			}
		});
    this.setData({
      memberType: wx.getStorageSync("member_type")
    })
    console.log('my----->' + this.data.memberType);
	},
	onShow: function() {
		_tools2.default.request({
			method: "get",
			url: "entry/wxapp/my",
			data: {
				token: wx.getStorageSync("token")
			},
			success: function(t) {
        t.info.level = parseInt(t.info.level)
				$this.setData(t.info);
				
				//保存当前经验值
				var lastExp = wx.getStorageSync("current_exp") || 0
        wx.setStorageSync("current_exp", t.info.exp);
        
        setTimeout(function(){
					$this.setData({
	          addedExp: parseInt(t.info.exp) - parseInt(lastExp),
					});
				}, 400);
				
				setTimeout(function(){
					$this.setData({
						addedExp: 0,
					});
				}, 2100);
				
			}
		});
    this.setData({
      memberType: wx.getStorageSync("member_type")
    })
	},
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
	
	transMoney: function() {
		if ($this.data.currency<10) {
			wx.showToast({
        title: '运动币不足',
        icon: 'none',
        duration: 1500
      })
			return;
		}
		
  	_tools2.default.request({
			method: "get",
			url: "entry/wxapp/transMoney",
			data: {
				token: wx.getStorageSync("token")
			},
			success: function(t) {
				if (t.status != 1) {
					wx.showToast({
	          title: t.info,
	          icon: 'none',
	          duration: 2000
	        })
				} else {
					wx.showToast({
	          title: '+￥'+ t.info.trans_money,
	          icon: 'none',
	          duration: 3000
	       })

					$this.setData({
						currency: parseInt((parseFloat($this.data.currency) - parseFloat(t.info.trans_currency))*100)/100,
						money: parseInt((parseFloat($this.data.money) + parseFloat(t.info.trans_money))*100)/100,
					})
				}
			}
		});
  },
	gotoCoinDetail: function() {
		wx.navigateTo({
      url: "../currencylog/currencylog"
		});
	},
	//优惠券
	showVoucher: function() {
		wx.navigateTo({
			url: "../voucher/voucher"
		});
	},
	// 我的订单
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
	//常见问题
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

  toEditUserInfo: function () {
    wx.navigateTo({
      url: '/bh_step/pages/personalinfo/personalinfo'
    })
  },

  toMyTerritory: function () {
    wx.navigateTo({
      url: '/bh_step/pages/myterritory/myterritory'
    })
  },

  toNews: function () {
    wx.navigateTo({
      url: '/bh_step/pages/news/news'
    })
  },

  toMember: function () {
    wx.navigateTo({
      url: '/bh_step/pages/member/member'
    })
  },

	// advjump: function(t) {
	// 	var e = t.currentTarget.dataset.index,
	// 		n = this.data.jump[e];
	// 	2 == n.type ? wx.navigateTo({
	// 		url: n.path,
	// 		fail: function(t) {
	// 			wx.switchTab({
	// 				url: n.path
	// 			});
	// 		}
	// 	}) : wx.navigateToMiniProgram({
	// 		appId: n.appid,
	// 		path: n.path,
	// 		success: function(t) {
	// 			console.log("success");
	// 		},
	// 		fail: function(t) {
	// 			wx.showModal({
	// 				title: "",
	// 				content: t.errMsg,
	// 				showCancel: !1
	// 			});
	// 		}
	// 	});
	// },

	//  核销
	onGenQrc: function() {
		wx.scanCode({
			success: function(t) {
				var e, n = wx.getStorageSync("token"),
					o = (_defineProperty(e = {
						trd_session: n
					}, "trd_session", n), _defineProperty(e, "voucher", t.result), e);
				_tools2.default.request({
					method: "get",
					url: "entry/wxapp/writeoff",
					data: o,
					success: function(t) {
						wx.showToast({
							title: "核销成功"
						});
					}
				});
			}
		});
	}
});