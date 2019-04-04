var Page = require('../../../util/xiaomeng/xmadx_sdk.min.js').xmad(Page).xmPage;
import ltadx from '../../../util/ltadx/ltadx';

var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

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
        tickImg64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAATBAMAAAB8awA1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAeUExURUxpcf///////////////////////////////////9noCcoAAAAJdFJOUwBnJ0n45pgBYKf+0pwAAABjSURBVBjTY2BAACMkNgOzqwISz2RmEJKU58wZyFIzBZClJgIpsQIkKcaZ6UhSnTOnFSB0qc4ESUKlGJgiQZJwA0GSMCmIJJJdQMmZMCmwJLIzVJGkwJICSH5RnYjsT6YGKAMAy3okgO+/GNUAAAAASUVORK5CYII=",
        goldImg64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACWUExURUxpcfuYA/23Gf63GP2uEvypC/uYA/+mDP+7KvyfBf6zFfueBfufBv+vE/yyFfufBP6oD/24Gf3BMPuYA/u8A/vCHPyuBfyqBPy+Cvy2Bf7SGv28J//XS/22GvzYIfvCF/y9HfyuC/viO/y+Ef3DMvzLF/yyD/7JLv/UQv3FD/zaNf7NOPucBv7LQf/aV/vgKPvUMP3aQgcpYzwAAAAUdFJOUwD5gphCsJgXBmNx6NMo7sZO2urg1mjlLQAAAadJREFUKM9lktuaoyAQhDHxEDWHmVkEFVFQEaMx8f2fbrsxk9nJ1gWf8FtF2zYhT0VxcEy99BL6B/KmKPRuYh6r+73qz8lvHHu3vgLdAY5V9eX/oEN4k0Bsp5TqCrHA8+4FQ7TZgnZZ1sCixDLP++/Mm6jGjtIcGSxZVihrN2/kyXEsHMsoRdbRQlrrb6Ej+vA4p02Gdor064BGMVrYNnZd67ad1vUKO8qESPBGF9pltn20qMfDoHUQn4QEepypK/TaTO1kTfmo0cqVOpGjmNWzUNW2Jqd57SCTKiGpmAf6LLRtG1o0dUldrtoTr5+LxhWq1mkqjanr3EGtAvKnnxV+GrwwTTXKVQtQBuQiFgEMKsrWujRXs6Ui3JMQ4NY15QKLsnSxTA874sulf3atRE9Rbk4+DNDAdOkZdq3LwZPnpjQulQ9n6F8shHAdBSfKuFSutftrx76X2O386uRCGcAI4UkApb8EjD2H4UP0kr2z4HtOPqSU+oULzjk7Rq8pOp2lHBhnIO4U/Dudh/0A0po7nMbvY7371FojuiT/zTxyP05i/+cy8hcvoT5QRFa6EwAAAABJRU5ErkJggg==",
        is_sign: !1,
        switch_off: "",
        switch_on: "",
        pop_bg: "",
        switch_off_1: "",
        switch_on_1: "",

      //骆驼广告
      bannerAds: [],
      // 需在xmad.ad中配置⼴告位ID
      xmad: {
        adData: {},
        ad: {
          banner: "[xm0e1c1d6b6f1947504db235d2689745]",
          //				banner: ["请填⼊您的banner⼴告位ID1", "请填⼊您的banner⼴告位ID2"],
          // insert: "请填⼊您的插屏⼴告位ID", // 按需引⼊
          // fixed: "请填⼊您的悬浮窗⼴告位ID" // 按需引⼊
        }
      },
    },
    onClosePop: function() {
        this.setData({
            is_sign: !1
        });
    },
    onLoad: function(t) {
        $this = this;
        this.setData({
		      img_url: app.getSiteImgurl(),
		    });
		    
        var e = app.siteInfo.siteroot.replace(/app\/index.php/, "") + app.img_url;
        this.setData({
            img_url: $this.data.img_url,
            gift_box: e + "/sign-in-pop/gift_box.png",
            close: e + "/sign-in-pop/close.png",
            pop_redpack: e + "/sign-in-pop/pop_redpack.png",
            pop_gold: e + "/sign-in-pop/pop_gold.png",
            switch_off: e + "/sign-in/switch_off.png",
            switch_on: e + "/sign-in/switch_on.png",
            pop_bg: e + "/sign-in-pop/pop_bg.png",
            switch_off_1: e + "/sign-in-pop/pop_switch_off.png",
            switch_on_1: e + "/sign-in-pop/pop_switch_on.png"
        });

      // 获取换量广告
      ltadx.getAdsByPosition('banner').then(ads => {
        if (ads) {
          this.setData({
            bannerAds: ads
          })
        }
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
                $this.setData(t.info);
            }
        });
    },
    onShow: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/sigin",
            data: {
                token: wx.getStorageSync("token")
            },
            success: function(t) {
                $this.setData(t.info), 1 != wx.getStorageSync(t.info.time + "token") && ($this.setData({
                    is_sign: !0
                }), wx.setStorageSync(t.info.time + "token", 1));
            }
        });
        
        app.loadInit($this, _tools2, 2);
    },
    switchRemindStatus: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/signinRemind",
            data: {
                token: wx.getStorageSync("token"),
                type: $this.data.sigin.is_remind
            },
            success: function(t) {
                $this.data.sigin.is_remind = 1 == $this.data.sigin.is_remind ? 0 : 1, $this.setData({
                    sigin: $this.data.sigin
                });
            }
        });
    },
    adJump: function(t) {
        var e = t.currentTarget.dataset.type, n = t.currentTarget.dataset.index;
        if (7 == e) var o = this.data.ad.middle[n]; else if (5 == e) o = this.data.ad.welfare[n]; else o = this.data.ad.popup[n];
        2 == o.type ? wx.navigateTo({
            url: o.path,
            fail: function(t) {
                wx.switchTab({
                    url: o.path
                });
            }
        }) : wx.navigateToMiniProgram({
            appId: o.appid,
            path: o.path,
            success: function(t) {
                console.log("success");
            },
            fail: function(t) {
                wx.showModal({
                    title: "",
                    content: t.errMsg,
                    showCancel: !1
                });
            }
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
    gotoCoinDetail: function() {
        wx.navigateTo({
            url: "../task/task"
        });
    },
    showVoucher: function() {
        wx.navigateTo({
            url: "../voucher/voucher"
        });
    },
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
    onGenQrc: function() {
        wx.scanCode({
            success: function(t) {
                var e, n = wx.getStorageSync("token"), o = (_defineProperty(e = {
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

  exchangeCoupleClicked: function (event) {
    // 记录点击事件
    console.log('report ad click event, adId=', event.currentTarget.dataset.adId);
    ltadx.sendAdClickEvent(event.currentTarget.dataset.adId);
  }
});