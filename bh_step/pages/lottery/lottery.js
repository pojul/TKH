var Page = require('../../../util/xiaomeng/xmadx_sdk.min.js').xmad(Page).xmPage;
import ltadx from '../../../util/ltadx/ltadx';

var _tools = require("../../../util/tools.js"),
	_tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
	return t && t.__esModule ? t : {
		default: t
	};
}

var $this, app = getApp();


//初始化获取加载数据，以及 任务完成后跳转回来，触发完成任务处理

Page({

  /**
   * 页面的初始数据
   */
  data: {
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

    lock: 0,
    img_url: "",
    mask: 0,
    bingo_id: 0,

    added_coin: 0,
    added_money: 0,
    added_exp: 0,
    
    
    rolling_notice: [
      ["爱の物语", '100运动币'],
      ["人间的声音", '100运动币'],
      ["小雨", '2元现金'],
      ["天上的林妹妹", '1元现金'],
      ["王小二", '100运动币'],
      ["下辈子ai你", '2元现金'],
      ["hei雅", '0.5元现金'],
      ["城市英雄", '100运动币'],
      ["清梦", '2元现金'],
      ["星河", '100运动币'],
      ["柠檬国度", '20运动币'],
      ["张喜宇", '1元现金'],
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  	$this = this;
  	
    this.setData({
      img_url: app.getSiteImgurl(),
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
	
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    _tools2.default.request({
			method: "get",
      url: "entry/wxapp/lottery",
			data: {
				token: wx.getStorageSync("token")
			},
			success: function(t) {
				$this.setData(t.info);
			}
		});

		app.loadInit($this, _tools2, 1);
  },

	//步数挑战报名
  doLottery: function() {
  	if ($this.data.member.currency < 10) {
  		wx.showToast({
        title: '运动币余额不足',
        icon: 'none',
      })
  		return false;
  	}

    if ($this.data.lock == 1) {
      return false;
    }
 
    $this.setData({
      lock: 1,
      bingo_id: 0,
    });
  	
  	_tools2.default.request({
			method: "get",
      url: "entry/wxapp/doLottery",
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
	          title: '恭喜抽中奖品',
	          icon: 'success',
	          duration: 500
	        })
          var logs = $this.data.logs;
          var member = $this.data.member;
          
          logs.unshift(t.info);
          member.currency = (member.currency - 10 + t.info.added_coin).toFixed(1);

          setTimeout(function () {
            $this.setData({
              added_coin: t.info.added_coin || 0,
              added_exp: t.info.added_exp || 0,
              added_money: t.info.added_money || 0,
              
            });
          }, 1000);
          setTimeout(function () {
            $this.setData({
              added_coin: 0,
              added_exp: 0,
              added_money: 0,

              logs: logs,
              lock: 0,
            });
          }, 2500);
          console.log(t.info.id)
          $this.setData({
            bingo_id: t.info.id,
            // logs: logs,
            member: member,
          })
				}
			}
		});
  },
  


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
		return console.log("bh_step/pages/index/index?share_tpye=5&parent_id=" + $this.data.member.member_id), {
			title: $this.data.share_text,
			imageUrl: $this.data.img_url + $this.data.share_image,
			path: "bh_step/pages/index/index?share_tpye=5&parent_id=" + $this.data.member.member_id
		};
  },
  
  bindTaskSuccess: function(e) {
		var t = e.currentTarget.dataset.id;
		if(0 == e.currentTarget.dataset.is_complete) {
			var a = {
				id: t,
        min_play_time: e.currentTarget.dataset.min_play_time,
				time: Date.parse(new Date())
			};
			wx.setStorageSync("task", a);
		}
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

	bindTaskFail: function(e) {
		wx.removeStorageSync("task")
	},

  toggleMask: function () {
    this.setData({
      mask: !this.data.mask,
    });
  },

  showTip: function () {
    this.toggleMask();

  },

  exchangeCoupleClicked: function (event) {
    // 记录点击事件
    console.log('report ad click event, adId=', event.currentTarget.dataset.adId);
    ltadx.sendAdClickEvent(event.currentTarget.dataset.adId);
  }
})