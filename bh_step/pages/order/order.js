var _tools = require("../../../util/tools.js"),
  _tools2 = _interopRequireDefault(_tools);
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

function _defineProperty(e, t, a) {
  return t in e ? Object.defineProperty(e, t, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = a, e;
}

var $this, app = getApp();

function order(t) {
  _tools2.default.request({
    method: "get",
    url: "entry/wxapp/order",
    data: {
      token: wx.getStorageSync("token"),
      p: t.data.p
    },
    success: function(e) {
      t.setData({
        orders: e.info
      });
    }
  });
}

Page(_defineProperty({
  data: {
    tabs: ["选项一", "选项二", "选项三"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,

    p: 1,
    orderStatus: {
      1: "FA2828",
      2: "FF8E00",
      3: "26BCC5",
      4: "909090"
    },
    share_text: "",
    share_image: "",
    currentGoods: 0,
    goodClass: ['竞拍', '拼步', '拼团', '砍价', '兑换'],
    p_size: 10,
    auctions: [],
    isLoadAuction: false,
    p_auction: 1, //竞拍
    bysteps: [],
    isLoadBystep: false,
    p_bystep: 1, //拼步
    assembles: [],
    isLoadAssemble: false,
    p_assemble: 1, //拼团
    bargains: [],
    isLoadBargain: false,
    p_bargain: 1, //砍价
    auctioOrderStatus: ['', '进行中', '待领取', '已完成', '已过期'],
  },

  setCurrentGood: function(e) {
    this.setData({
      currentGoods: e.currentTarget.dataset.index
    });
  },

  getBystepList: function() {
    if (this.data.isLoadBystep) {
      return;
    }
    this.setData({
      isLoadBystep: true
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/groupOrderList",
      data: {
        token: wx.getStorageSync("token"),
        type: 3,
        p_size: that.data.p_size,
        p: that.data.p_bystep
      },
      success: function(res) {
        that.setData({
          isLoadBystep: false
        })
        if (res.info.order_list.length > 0) {
          that.setData({
            p_bystep: (that.data.p_bystep + 1),
            bysteps: that.data.bysteps.concat(res.info.order_list)
          })
        }
      },
      fail: function(res) {
        that.setData({
          isLoadBystep: false
        })
      }
    });
  },

  toBystepDetail: function (e) {
    let index = e.currentTarget.dataset.index;
    if (this.data.bysteps[index].is_complete == 4) {
      this.showToast('该商品已过期');
    } else {
      wx.navigateTo({
        url: '/bh_step/pages/bystepDetail/bystepDetail?type=1&orderid=' + this.data.bysteps[index].id + '&goodid=' + this.data.bysteps[index].goods.id
      })
    }
  },

  getAssembleList: function() {
    if (this.data.isLoadAssemble) {
      return;
    }
    this.setData({
      isLoadAssemble: true
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/groupOrderList",
      data: {
        token: wx.getStorageSync("token"),
        type: 1,
        p_size: that.data.p_size,
        p: that.data.p_assemble
      },
      success: function(res) {
        that.setData({
          isLoadAssemble: false
        })
        if (res.info.order_list.length > 0) {
          that.setData({
            p_assemble: (that.data.p_assemble + 1),
            assembles: that.data.assembles.concat(res.info.order_list)
          })
        }
      },
      fail: function(res) {
        that.setData({
          isLoadAssemble: false
        })
      }
    });
  },

  toAssembleDetail: function (e) {
    let index = e.currentTarget.dataset.index;
    if (this.data.assembles[index].is_complete == 4) {
      this.showToast('该商品已过期');
    } else {
      wx.navigateTo({
        url: '/bh_step/pages/checkOrderAssemble/checkOrderAssemble?type=1&orderid=' + this.data.assembles[index].id + '&goodid=' + this.data.assembles[index].goods.id
      })
    }
  },

  getBargainList: function() {
    if (this.data.isLoadBargain) {
      return;
    }
    this.setData({
      isLoadBargain: true
    })
    var that = this;
    _tools2.default.request({
      method: "get", 
      url: "entry/wxapp/groupOrderList",
      data: {
        token: wx.getStorageSync("token"),
        type: 2,
        p_size: that.data.p_size,
        p: that.data.p_bargain
      },
      success: function(res) {
        that.setData({
          isLoadBargain: false
        })
        if (res.info.order_list.length > 0) {
          that.setData({
            p_bargain: (that.data.p_bargain + 1),
            bargains: that.data.bargains.concat(res.info.order_list)
          })
        }
      },
      fail: function(res) {
        that.setData({
          isLoadBargain: false
        })
      }
    });
  },

  toBargainDetail: function (e) {
    let index = e.currentTarget.dataset.index;
    if (this.data.bargains[index].is_complete == 4) {
      this.showToast('该商品已过期');
    } else {
      wx.navigateTo({
        url: '/bh_step/pages/bargaindetail/bargaindetail?type=1&orderid=' + this.data.bargains[index].id + '&goodid=' + this.data.bargains[index].goods.id
      })
    }
  },

  getAuctionList: function() {
    if (this.data.isLoadAuction) {
      return;
    }
    this.setData({
      isLoadAuction: true
    })
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/auctionOrderList",
      data: {
        p_size: that.data.p_size,
        p: that.data.p_auction
      },
      success: function(res) {
        that.setData({
          isLoadAuction: false
        })
        for (let i = 0; i < res.info.order_list.length; i++) {
          if (res.info.order_list[i].is_end != 3) {
            res.info.order_list[i].order_status_str = that.data.auctioOrderStatus[res.info.order_list[i].order_status];
          } else {
            res.info.order_list[i].order_status_str = '已结束';
          }
        }
        if (res.info.order_list.length > 0) {
          that.setData({
            p_auction: (that.data.p_auction + 1),
            auctions: that.data.auctions.concat(res.info.order_list)
          })
        }
      },
      fail: function(res) {
        that.setData({
          isLoadAuction: false
        })
      }
    });
  },

  toAuctionDetail: function (e) {
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/bh_step/pages/auctionDetail/auctionDetail?type=1&id=' + this.data.auctions[index].auction.id
    })
  },

  onLoad: function(e) {
    this.setData({
      img_url: app.siteInfo.siteroot.replace(/app\/index.php/, "") + app.img_url
    }), $this = this;

    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    this.getBystepList();
    this.getAssembleList();
    this.getBargainList();
    this.getAuctionList();
  },
  onReady: function() {
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/config",
      data: {
        token: wx.getStorageSync("token"),
        key: "xcx_title,share_text,share_image"
      },
      success: function(e) {
        $this.setData(e.info);
      }
    });
  },
  onShow: function() {
    order(this);
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {
    if (this.data.currentGoods == 1) {
      this.getBystepList();
    } else if (this.data.currentGoods == 0) {
      this.getAuctionList();
    } else if (this.data.currentGoods == 2) {
      this.getAssembleList();
    } else if (this.data.currentGoods == 3) {
      this.getBargainList();
    }
  },
  onShareAppMessage: function() {
    return console.log("bh_step/pages/index/index?share_tpye=1&parent_id=" + $this.data.member_id), {
      title: $this.data.share_text,
      imageUrl: $this.data.share_image,
      path: "bh_step/pages/index/index?share_tpye=1&parent_id=" + $this.data.member_id
    };
  },
  nagativeToIndex: function() {
    wx.switchTab({
      url: "/bh_step/pages/goodsconvert/goodsconvert"
    });
  },
  navigateToDetial: function() {
    var e = t.currentTarget.dataset.value;
    wx.navigateTo({
      url: "/bh_step/pages/goods/goods?id=" + e
    });
  },
  navigateToVoucher: function() {
    wx.navigateTo({
      url: "/bh_step/pages/voucher/voucher"
    });
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  copy: function(e) {
    var t = e.currentTarget.dataset.value;
    wx.setClipboardData({
      data: t,
      success: function(e) {
        wx.showToast({
          title: "复制成功"
        }), o.sensors.track("XMClick", {
          ck_module: "复制运单号",
          contentid: "",
          page: "订单页面"
        });
      }
    });
  }
}, "navigateToDetial", function(e) {
  var t = e.currentTarget.dataset.value,
    a = e.currentTarget.dataset.etype,
    o = 2 == a || 3 == a ? "../goods/goods?id=" : "../currencyGoods/currencyGoods?id=";
  wx.navigateTo({
    url: o + t
  });
}));