// bh_step/pages/bystepDetail/bystepDetail.js
var _tools = require("../../../util/tools.js"),
  _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0, //0: check order;1: order detail;2: invited order
    goodid: -1,
    goodDetail: {},
    groupid: -1,
    orderid: -1,
    orderDetail: {},
    baseImageUrl: getApp().baseImageUrl,
    progress: 0,
    setInter: '',
    isCountDown: false,
    hasUpdateStep: false,
    showRecGoodDialog: false,
  },

  toRulesDetail: function() {
    wx.navigateTo({
      url: '/bh_step/pages/bystepRules/bystepRules?type=' + 1
    })
  },

  getGoodDetail: function() {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/groupGoodsDetail",
      data: {
        id: that.data.goodid
      },
      success: function(t) {
        that.setData({
          goodDetail: t.info.group_goods
        })
      }
    });
  },

  toMoreGood: function () {
    wx.switchTab({
      url: '/bh_step/pages/goodsconvert/goodsconvert?currentGoods=4',
    })
  },

  confirmStepOrder: function (tencryptedData, tiv) {
    var that = this;
    let tempData = {
      goods_id: that.data.goodid,
      encryptedData: tencryptedData,
      iv: tiv
    };
    if (that.data.groupid >= 0) {
      tempData.group_id = that.data.groupid;
    }
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/confirmStepOrder",
      data: tempData,
      success: function(t) {
        that.setData({
          type: 1,
          orderid: t.info.order_id
        });
        that.getOrderDetail(tencryptedData, tiv);
      },
      fail: function (t) {
      }
    });
  },

  updateStep: function(isConfimStepOrder) {
    var that = this;
    wx.getWeRunData({
      success: function(t) {
        if (isConfimStepOrder) {
          that.confirmStepOrder(t.encryptedData, t.iv);
        } else {
          that.getOrderDetail(t.encryptedData, t.iv);
        }
      },
      fail: function(t) {
        wx.openSetting({
          success: function(t) {
            let hasAuth = t.authSetting["scope.werun"];
            console.log("hasAuth--->" + hasAuth);
            if (hasAuth) {
              that.updateStep(isConfimStepOrder);
            } else {
              wx.navigateBack({});
            }
          }
        });
      }
    });
  },

  getOrderDetail: function (tencryptedData, tiv) {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/stepOrderDetail",
      data: {
        order_id: that.data.orderid,
        encryptedData: tencryptedData,
        iv: tiv
      },
      success: function(t) {
        that.data.progress = (t.info.step.total_step_number / t.info.goods.step_number);
        if (that.data.progress>1) {
          that.data.progress = 1;
        }
        that.setData({
          orderDetail: t.info,
          groupid: t.info.step.group_id,
          progress: that.data.progress,
          orderid: t.info.step.id
        });
        if (t.info.step.is_complete == 1) {
          that.startCountDown();
        }
        if (!that.data.hasUpdateStep) {
          that.setData({
            hasUpdateStep: true
          })
          for (let i = 0; i < t.info.group_member.length; i++) {
            if (t.info.group_member[i].member_id == wx.getStorageSync("member_id")) {
              that.updateStep(false);
            }
          }
        }
        if (that.data.type == 2) {
          let hasJoined = false;
          for (let i = 0; i < t.info.group_member.length; i++) {
            if (t.info.group_member[i].member_id == wx.getStorageSync("member_id")) {
              hasJoined = true;
            }
          }
          if (hasJoined) {
            that.setData({
              type: 1
            })
          } else {
            that.updateStep(true);
          }
        }
        if (t.info.step.is_complete==2){
          that.setData({
            showRecGoodDialog: true
          })
        }
      }
    });
  },

  closeRecGood: function () {
    this.setData({
      showRecGoodDialog: false
    })
  },

  toCheckOrder: function () {
    //wx.navigateBack({});
    wx.redirectTo({
      url: '/bh_step/pages/checkOrderBystep/checkOrderBystep?goodid=' + this.data.goodid + '&orderid=' + this.data.orderid
    })
  },

  startCountDown: function() {
    var that = this;
    //将计时器赋值给setInter
    if (that.data.isCountDown) {
      return;
    }
    that.data.setInter = setInterval(
      function() {
        that.setData({
          isCountDown: true
        });
        if (that.data.orderDetail.step.expire_time.sec > 0) {
          that.data.orderDetail.step.expire_time.sec = that.data.orderDetail.step.expire_time.sec - 1;
        } else {
          if (that.data.orderDetail.step.expire_time.min > 0) {
            that.data.orderDetail.step.expire_time.sec = 59;
            that.data.orderDetail.step.expire_time.min = that.data.orderDetail.step.expire_time.min - 1
          } else {
            if (that.data.orderDetail.step.expire_time.hour > 0) {
              that.data.orderDetail.step.expire_time.sec = 59;
              that.data.orderDetail.step.expire_time.min = 59;
              that.data.orderDetail.step.expire_time.hour = that.data.orderDetail.step.expire_time.hour - 1;
            } else {
              that.endCountDown();
              that.data.orderDetail.step.is_complete = 4;
            }
          }
        }
        that.setData({
          orderDetail: that.data.orderDetail
        });
      }, 1000);
  },

  endCountDown: function() {
    var that = this;
    clearInterval(that.data.setInter);
    that.setData({
      isCountDown: false
    });
  },

  authorize: function(e) {
    console.log("authorize---->" + e.detail.authorize);
    if (e.detail.authorize) {
      this.onLoad(this.data.tempoptions);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (wx.getStorageSync("has_login") != 2) {
      wx.redirectTo({
        url: '/bh_step/pages/authorize/authorize?path=/bh_step/pages/bystepDetail/bystepDetail&opt=' + JSON.stringify(options)
      })
      return;
    }
    console.log(JSON.stringify(options));
    if (!options.type || options.type < 0) {
      this.showToast("数据错误");
      wx.navigateBack({});
      return;
    }
    if (!options.goodid || options.goodid < 0) {
      this.showToast("数据错误");
      wx.navigateBack({});
      return;
    }
    if (options.type != 0 && (!options.orderid || options.orderid < 0)) {
      this.showToast("数据错误");
      wx.navigateBack({});
      return;
    }
    if (options.type == 2 && (!options.groupid || options.groupid < 0)) {
      this.showToast("数据错误");
      wx.navigateBack({});
      return;
    }
    if (this.data.type == 1) {
      options.type = 1;
    }
    this.setData({
      goodid: options.goodid,
      type: options.type,
      groupid: (!options.groupid ? -1 : options.groupid),
      orderid: (!options.orderid ? -1 : options.orderid),
      tempoptions: options
    });
    this.getGoodDetail();
    if (this.data.orderid >= 0) {
      this.updateStep(false);
    }
    if (this.data.type == 0) {
      this.updateStep(true);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
  },

  showToast: function(str) {
    wx.showToast({
      title: str,
      icon: 'none',
      duration: 1500,
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.endCountDown();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var that = this;
    console.log('onShareAppMessage---->');
    return {
      title: that.data.goodDetail.goods_name,
      path: '/bh_step/pages/bystepDetail/bystepDetail?type=2&goodid=' + that.data.goodid + '&orderid=' + that.data.orderid + '&parent_id=' + wx.getStorageSync("member_id") + '&groupid=' + that.data.groupid
    }
  }
})