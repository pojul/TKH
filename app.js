var App = require('./util/ltadx/ltadx.js').ltApp;
var App = require('./util/xiaomeng/xmadx_sdk.min.js').xmad(App,'App').xmApp;
const ald = require('./util/ald/ald-stat.js')

App({
    onLaunch: function() {},
    onShow: function(n) {
    	
			console.log("[onShow] 本次场景值:", n.scene)
			this.scene = n.scene;
			
    },
    onHide: function() {},
    onError: function(n) {},
    util: require("we7/resource/js/util.js"),
    siteInfo: require("siteinfo.js"),
    img_url: "addons/bh_step/template/image",
		scene: '',
		
    getSiteImgurl: function() {
      return this.siteInfo.siteroot.replace(/app\/index.php/, "") + this.img_url;
    },
    
    //重新加载任务列表
		loadTask: function(e, _tools2, num) {
			num = num || 0;
			var $this = this;
			_tools2.default.request({
				method: "get",
				url: "entry/wxapp/task",
				data: {
					token: wx.getStorageSync("token")
				},
				success: function(t) {
					var tasks = []; 
					if (num > 0) {
						for(var i=0;i< t.info.task.length; i++) {
							if (t.info.task[i].is_complete != 1) {
								tasks.push(t.info.task[i]);
								if (tasks.length >= num) {
									break;
								}
							}
						}
					} else {
						tasks = t.info.task;
					}
					t.info.task = tasks;
					
					e.setData({
						taskInfo: t.info
					});
		
					//根据场景值判断是否已添加到我的小程序
					if($this.scene == 1089 && !t.info.add_xcx.is_add_xcx) {
						_tools2.default.request({
							method: "get",
							url: "entry/wxapp/finishAddXcx",
							data: {
								token: wx.getStorageSync("token")
							},
							success: function(t2) {
								wx.showToast({
									title: '+' + t.info.add_xcx.currency + '运动币',
									icon: 'success',
									// image: '/images/tan.png',
									duration: 2000
								})
							}
						});
					}
				}
			});
		},
		
		//初始化获取加载数据，以及 任务完成后跳转回来，触发完成任务处理
		loadInit: function(e, _tools2, num, other_func) {
			num = num || 0;
			other_func = other_func || function() {};
			var t = wx.getStorageSync("task");
		  var min_play_time = t && t.min_play_time > 0 ? t.min_play_time : 30;
		  t ? (min_play_time*1000 < Date.parse(new Date()) - t.time ? _tools2.default.request({
				method: "get",
				url: "entry/wxapp/taskComplete",
				data: {
					token: wx.getStorageSync("token"),
					task_id: t.id
				},
				success: function(t2) {
					e.setData({
						activated: !0,
						isTask: !1
					});
					if(t2.status == 1) {
		        e.setData({
		          added_coin: t2.info.currency,
		          added_exp: 10
		        });
		        setTimeout(function () {
		          e.setData({
		            added_coin: 0,
		            added_exp: 0
		          });
		        }, 1500);
		
					}
		
					this.loadTask(e, _tools2, num);
					other_func(e);
				}
			}) : wx.showModal({
				title: "温馨提示",
		      content: "需要超过" + min_play_time +"秒才能获得奖励哦",
				showCancel: !1,
				success: function(t) {}
			}), wx.removeStorageSync("task"), this.loadTask(e, _tools2, num)) : this.loadTask(e, _tools2, num), other_func(e);
		
			 		
		}
});