var _tools = require("../../../util/tools.js"),
	_tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
	return t && t.__esModule ? t : {
		default: t
	};
}

var $this, app = getApp();


function countdown(t) {
    var a = t.data.tomorrow.endtime || []
    var o = new Date().getTime() / 1e3
    var e = a - (o = parseInt(o)) || [];
    var df = dateformat(e)
    
    t.setData({
    	hour: df[0] < 10 ? '0'+ df[0] : df[0],
      minute: df[1] < 10 ? '0'+ df[1] : df[1],
      sec: df[2] < 10 ? '0'+ df[2] : df[2],
    }), e <= 0 && t.setData({
      hour: 0,
      minute: 0,
      sec: 0,  
    }), setTimeout(function() {
        e -= 1, countdown(t);
    }, 1e3);
}

function dateformat(t) {
    var a = Math.floor(t);
    Math.floor(a / 3600 / 24);
    return [Math.floor(a / 3600 % 24), Math.floor(a / 60 % 60), Math.floor(a % 60)]
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url: "",
    mask: 0,
    
    tomorrow: {},
    today: {},
    yesterday: {},
    dayinfo: {},
    progress_pert: 0,
    
    hour: 0,
    minute: 0,
    sec: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  	$this = this;
  	countdown($this);
  	
    this.setData({
      img_url: app.getSiteImgurl(),
      tomorow: {
      	endtime: new Date(new Date().setHours(0, 0, 0, 0)) / 1000 + 86400,
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
		//获取3天挑战信息
    _tools2.default.request({
			method: "get",
			url: "entry/wxapp/defiance",
			data: {
				token: wx.getStorageSync("token")
			},
			success: function(t) {
				$this.setData(t.info);
			}
		});

    this.getTodayInfo();
  },

	//获取用户今天步数等信息
	getTodayInfo: function() {
    _tools2.default.request({
			method: "get",
			url: "entry/wxapp/dayinfo",
			data: {
				token: wx.getStorageSync("token")
			},
			success: function(t) {
				var progress_pert = t.info.effective_step < 3000 ? Math.floor(100 * t.info.effective_step/3000) : 100;
				$this.setData({
					dayinfo: t.info,
					progress_pert: Math.floor(progress_pert)
				});
							
			}
		});
	},
	
	//步数挑战报名
  joinDefiance: function() {
  	if ($this.data.member.currency < $this.data.tomorrow.entryfee) {
  		wx.showToast({
        title: '运动币余额不足',
        icon: 'none',
      })
  		return false;
  	}
  	
  	_tools2.default.request({
			method: "get",
			url: "entry/wxapp/joinDefiance",
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
					debugger
					wx.showToast({
	          title: '报名成功',
	          icon: 'success',
	          duration: 2000
	        })
					$this.data.tomorrow.has_join = 1;
					$this.data.tomorrow.acceptor_count = 1 + parseInt($this.data.tomorrow.acceptor_count);
					$this.data.tomorrow.total_bonus = (0.1 + parseInt($this.data.tomorrow.total_bonus*10)/10).toFixed(1);
					
					$this.setData({
						tomorrow: $this.data.tomorrow
					})
				}
			}
		});
  },
  
  //步数挑战成功打卡
  finishDefiance: function() {
  	_tools2.default.request({
			method: "get",
			url: "entry/wxapp/finishDefiance",
			data: {
				token: wx.getStorageSync("token")
			},
			success: function(t) {
				if (t.status != 1) {
					wx.showToast({
	          title: t.info,
	          icon: 'none',
	          duration: 3000
	        })
				} else {
					wx.showToast({
	          title: '打卡成功',
	          icon: 'success',
	          duration: 3000
	        })
					$this.data.today.overcome = 1;
					$this.data.today.overcomer_count = parseInt($this.data.today.overcomer_count) + 1;
					$this.data.today.total_bonus = (0.1 + parseInt($this.data.today.total_bonus*10)/10).toFixed(1);
					//2位小数
					$this.data.today.earnings = parseInt($this.data.today.total_bonus/$this.data.today.overcomer_count*100)/100;
					$this.setData({
						today: $this.data.today
					})
				}
			}
		});
  },

	//更新运动步数
  updateStep: function() {
  	wx.getWeRunData({
			success: function(t) {
				setTimeout(function() {
					wx.showToast({
	          title: '更新步数成功',
	          icon: 'success',
	          duration: 2000
	        })
					_tools2.default.request({
						method: "get",
						url: "entry/wxapp/updateStep",
						data: {
							token: wx.getStorageSync("token"),
							encryptedData: t.encryptedData,
							iv: t.iv
						},
						success: function(t) {
							$this.getTodayInfo();
							
						}
					});
				}, 200);
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

  toggleMask: function () {
    this.setData({
      mask: !this.data.mask,
    });
  },

  showTip: function () {
    this.toggleMask();

  }
})