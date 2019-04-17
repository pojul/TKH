var _tools = require("../../../util/tools.js"),
	_tools2 = _interopRequireDefault(_tools);
var util = require("../../../we7/resource/js/util.js");

function _interopRequireDefault(t) {
	return t && t.__esModule ? t : {
		default: t
	};
}

var $this, app = getApp();

//获取&设置悬浮icon信息
function suspension(e) {
	_tools2.default.request({
		method: "get",
		url: "entry/wxapp/suspension",
		data: {
			token: wx.getStorageSync("token")
		},
		success: function(t) {
			e.setData({
				suspension: t.info,
				my_currency: t.info.my_currency,
				today: t.info.toady
			});
		}
	});
}

//获取解锁红包配置
function bag_share(e) {
	_tools2.default.request({
		method: "get",
		url: "entry/wxapp/shareBag",
		data: {
			token: wx.getStorageSync("token")
		},
		success: function(t) {
			e.setData({
				bag_share: t.info,
				bag_unlock: !0
			});
		}
	});
}
 

//初始化获取加载数据，以及 任务完成后跳转回来，触发完成任务处理
function load(e) {
	app.loadInit(e, _tools2, suspension);
  
	//更新运动步数
	// wx.getWeRunData({
	// 	success: function(t) {
	// 		setTimeout(function() {
	// 			_tools2.default.request({
	// 				method: "get",
	// 				url: "entry/wxapp/updateStep",
	// 				data: {
	// 					token: wx.getStorageSync("token"),
	// 					encryptedData: t.encryptedData,
	// 					iv: t.iv
	// 				},
	// 				success: function(t) {
	// 					suspension(e);
	// 				}
	// 			});
	// 		}, 1e3);
	// 	}
	// });

}

Page({
	data: {
		mask: 0,
		sigin: "",
		remind: 0,
		bgShow: !1,
		isBag: !1,
		suspension: "",
		share_text: "",
		share_image: "",
		share_tpye: 1,
		parent_id: 0,
		goods_id: 0,
		dialogState: 1,
		giveShow: !1,
		give_status: 1,
		cut_step: 0,
		activated: !1,
		author_show: 2,
		mydialog: "",
		ad_pop: 0,
    baseImageUrl: getApp().baseImageUrl,
	},
	onLoad: function(t) {
		var e = app.getSiteImgurl();
		this.setData({
			img_url: e,
			mydialog: e + "/wechat/mydialog.png"
		});
		$this = this, t.share_tpye && (wx.setStorageSync("share_tpye", t.share_tpye),
			$this.data.share_tpye = t.share_tpye), t.scene && ($this.data.parent_id = decodeURIComponent(t.scene),
			wx.setStorageSync("parent_id", $this.data.parent_id)), t.parent_id && (wx.setStorageSync("parent_id", t.parent_id),
			$this.data.parent_id = t.parent_id), t.goods_id && (wx.setStorageSync("goods_id", t.goods_id),
			$this.data.goods_id = t.goods_id);
	},
	onShow: function() {
		var t = {
			token: wx.getStorageSync("token")
		};
		0 < $this.data.goods_id && $this.data.parent_id && 3 == $this.data.share_tpye && (t.goods_id = $this.data.goods_id,
			t.parent_id = $this.data.parent_id);
		_tools2.default.request({
			method: "get",
			url: "entry/wxapp/index",
			data: t,
			success: function(t) {
        wx.setStorageSync("is_receive_new_bag", t.info.member.is_receive_new_bag);
				$this.setData(t.info);

				$this.setData({
					remind: t.info.bag.is_remind,
					invitation: t.info.invitation,
					my_currency: t.info.member.currency,
					share: t.info.share,
					member_id: t.info.member.id,
					give_step: t.info.give_step,
					giveShow: !0
				});
				wx.setNavigationBarTitle({
					title: t.info.xcx_title
				});
				//弹窗广告
				if(!wx.getStorageSync("ad_pop" + t.info.time) && 1 != $this.data.author_show && t.info.advertisement.ad_pop) {
					$this.setData({
						ad_pop: 1
					});
					//一天只弹窗广告一次
					wx.setStorageSync("ad_pop" + t.info.time, 1);
				}
				load($this);
			}
		});

	},

  authorize: function (e) {
  },

	//用户授权获取用户信息
	getUserInfo: function(t) {
		if("getUserInfo:ok" == t.detail.errMsg) {
			t.detail.userInfo;
			_tools2.default.request({
				method: "get",
				url: "entry/wxapp/register",
				data: {
					token: wx.getStorageSync("token"),
					encryptedData: t.detail.encryptedData,
					iv: t.detail.iv
				},
				success: function(t) {
					suspension($this);
				}
			});
		} else console.log("用户拒绝了");
	},

	//收取金币
	receive: function(t) {
		var e = t.currentTarget.dataset.id,
			a = t.currentTarget.dataset.source,
			s = wx.createInnerAudioContext();
		s.autoplay = !0, s.src = this.data.img_url + "/coin.mp3", console.log(s.src), s.onPlay(function() {
			console.log("开始播放");
		}), s.onError(function(t) {
			console.log(t.errMsg), console.log(t.errCode);
		}), _tools2.default.request({
			method: "get",
			url: "entry/wxapp/receive",
			data: {
				token: wx.getStorageSync("token"),
				id: e,
				formid: t.detail.formId
			},
			success: function(t) {
				//收取签到金币成功，跳转到签到界面
				3 == a && wx.navigateTo({
					url: "../sigin/sigin"
				}), suspension($this);
				//				@todo 收取签挑战金币，挑战到挑战界面
			}
		});
	},
	//显示收红包module
	showBg: function() {
		console.log($this.data.is_bag), 0 != $this.data.bag.is_bag || $this.data.bgShow ? bag_share($this) : $this.setData({
			bgShow: !0
		});
	},
	//关闭红包module
	gotoClosePop: function() {
		$this.setData({
			bag_unlock: !1
		});
	},

	//收红包
	receive_bg: function(t) {
		var e = {
			frequency: t.currentTarget.dataset.index,
			token: wx.getStorageSync("token")
		};
		_tools2.default.request({
			method: "get",
			url: "entry/wxapp/bag",
			data: e,
			success: function(t) {
				$this.data.bag.is_bag = 1, $this.setData({
					bag: $this.data.bag
				}), 1 < e.frequency ? bag_share($this) : $this.setData({
					isBag: !0,
					bgShow: !1,
					bag_cash: t.info
				});
			}
		});
	},
	showBagShare: function() {
		$this.setData({
			bgShow: !1,
			isBag: !1
		}), bag_share($this);
	},
	onCloseClick: function() {
		this.setData({
			bgShow: !1,
			isBag: !1,
			giveShow: !1
		});
	},
	onSkipBag: function() {
		this.setData({
			bag_unlock: 1,
			bgShow: !1,
			isBag: !1,
			giveShow: !1
		});
	},

	hide: function() {
		$this.setData({
			bgShow: !1,
			isBag: !1
		});
	},
	onReady: function() {},
	onHide: function() {},

	//提醒收红包
	bgRemind: function() {
		var e = $this.data.remind ? 1 : 2;
		_tools2.default.request({
			method: "get",
			url: "entry/wxapp/bgRemind",
			data: {
				token: wx.getStorageSync("token"),
				type: e
			},
			success: function(t) {
				$this.setData({
					remind: 1 == e ? 0 : 1
				});
			}
		});
	},

	//赠送步数
	tapcut: function() {
		var t = {
			token: wx.getStorageSync("token"),
			goods_id: this.data.goods_id,
			parent_id: this.data.parent_id
		};
		console.log(141515), _tools2.default.request({
			method: "get",
			url: "entry/wxapp/give",
			data: t,
			success: function(t) {
				$this.setData({
					give_status: 2
				}), $this.setData({
					cut_step: t.info
				});
			}
		});
	},

	onShareAppMessage: function(t) {
		if(wx.showShareMenu({
				withShareTicket: 0
			}), console.log(t), null != t.target && "bag" == t.target.dataset.type) var e = $this.data.share.bag.share_text,
			a = $this.data.share.bag.share_image,
			s = "bh_step/pages/index/index?share_tpye=2&parent_id=" + $this.data.member_id;
		else e = $this.data.share.ordinary.share_text,
			a = $this.data.share.ordinary.share_image, s = "bh_step/pages/index/index?share_tpye=1&parent_id=" + $this.data.member_id;
		return {
			title: e,
			path: s,
			imageUrl: a,
			success: function(t) {
				if("shareAppMessage:ok" == t.errMsg) {
					var e = t.shareTickets;
					e ? wx.getShareInfo({
						shareTicket: e[0],
						success: function(t) {
							_tools2.default.request({
								method: "get",
								url: "entry/wxapp/shareGroup",
								data: {
									token: wx.getStorageSync("token"),
									encryptedData: t.encryptedData,
									iv: t.iv
								},
								success: function(t) {
									console.log("f"), console.log(t), suspension($this);
								}
							});
						}
					}) : console.log("分享到好友" + t);
				}
			}
		};
	},

	//跳转前记录任务ID和跳转时间
	bindsuccess: function() {
		var t = {
			id: this.data.suspension.task.id,
			time: Date.parse(new Date())
		};
		wx.setStorageSync("task", t);
	},

	bindfail: function() {
		console.log(45454545);
	},

	//点击跳转到其他小程序的广告
	clickAD: function() {
		//跳转前记录任务ID和跳转时间
		var t = {
			id: this.data.suspension.task.id,
			time: Date.parse(new Date())
		};
		wx.setStorageSync("task", t);
		console.log($this.data.suspension.task);

		//跳转到其他小程序
		wx.navigateToMiniProgram({
			appId: $this.data.suspension.task.appid,
			path: $this.data.suspension.task.path,
			extraData: {},
			envVersion: "release",
			success: function(t) {},
			fail: function(t) {
				debugger
				wx.removeStorageSync("task")
//				wx.showModal({
//					title: "",
//					content: t.errMsg,
//					showCancel: !1
//				});
			}
		});
	},

	startTask: function(t) {
		var e = t.currentTarget.dataset.id,
			a = this.data.taskInfo.task[e],
			o = {
				id: this.data.taskInfo.task[e].id,
        min_play_time: this.data.taskInfo.task[e].min_play_time,
				time: Date.parse(new Date())
			};
		0 == a.is_complete && wx.setStorageSync("task", o), wx.navigateToMiniProgram({
			appId: a.appid,
			path: a.path,
			extraData: {},
			envVersion: "release",
			success: function(t) {},
			fail: function(t) {
				wx.removeStorageSync("task")
//				wx.showModal({
//					title: "",
//					content: t.errMsg,
//					showCancel: !1
//				});
			}
		});
	},


	//显示任务弹窗
	showdialog: function() {
		this.setData({
			isTask: !0
		});
	},
	//关闭所有弹窗
	closedialog: function() {
		this.setData({
			isTask: !1
		}), this.setData({
			isshow_sigin: !1
		}), this.setData({
			author_show: !1
		}), this.setData({
			ad_pop: 0
		});
	},
	
	//关闭幸运金币弹窗
	closeLucyDialog: function() {
		var tmp = $this.data.suspension;
		tmp.task = null;
		this.setData({
			isTask: !1,
			suspension: tmp
		}), this.setData({
			isshow_sigin: !1
		}), this.setData({
			author_show: !1
		}), this.setData({
			ad_pop: 0
		});
	},
	

	showSigin: function() {
		wx.navigateTo({
			url: "../sigin/sigin"
		});
	},
	sendPushTime: function() {
		_tools2.default.request({
			method: "get",
			url: "entry/wxapp/signinRemind",
			data: {
				token: wx.getStorageSync("token")
			},
			success: function(t) {
				$this.data.sigin.is_remind = 1, $this.setData({
					sigin: $this.data.sigin
				});
			}
		});
	},

	advjump: function(t) {
		var e = t.currentTarget.dataset.type;
		if("upper" == e) var a = t.currentTarget.dataset.index,
			s = this.data.advertisement.upper[a];
		else if("ad_pop" == e) s = this.data.advertisement.ad_pop;
		else s = this.data.advertisement.home_middle;

		2 == s.type && wx.navigateTo({
			url: s.path,
			fail: function(t) {
				wx.switchTab({
					url: s.path
				});
			}
		});

	},
	//跳到商品详情
	goodsDetails: function(t) {
		var e = t.currentTarget.dataset.id,
			a = t.currentTarget.dataset.etype,
			s = 2 == a || 3 == a ? "../goods/goods?id=" : "../currencyGoods/currencyGoods?id=";
		wx.navigateTo({
			url: s + e
		});
	},

	//分享商品
	shareGoods: function() {
		var t = this.data.give_step.goods.id;
		wx.navigateTo({
			url: "../goods/goods?id=" + t
		});
	},

	showTip: function () {
    this.toggleMask();
  },
	toggleMask: function () {
    this.setData({
      mask: !this.data.mask,
    });
  },
});