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
    currentGoods: 0,
    goodClass: ['竞拍', '拼步', '拼团', '砍价'],
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
    userInfo: {},
  },

  getUserInfo: function() {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/userInfo",
      data: {
        view_member_id: wx.getStorageSync("member_id")
      },
      success: function(t) {
        that.setData({
          userInfo: t.info.userInfo
        })
      }
    });
  },

  setCurrentGood: function(e) {
    console.log("setCurrentGood: " + e.currentTarget.dataset.index);
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
      url: "entry/wxapp/groupGoodsList",
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
        if (res.info.goods_list.length > 0) {
          that.setData({
            p_bystep: (that.data.p_bystep + 1),
            bysteps: that.data.bysteps.concat(res.info.goods_list)
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

  toBystepDetail: function(e) {
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/bh_step/pages/bystepDetail/bystepDetail?type=' + 0
    })
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
      url: "entry/wxapp/groupGoodsList",
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
        if (res.info.goods_list.length > 0) {
          that.setData({
            p_assemble: (that.data.p_assemble + 1),
            assembles: that.data.assembles.concat(res.info.goods_list)
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

  toAssembleDetail: function(e) {
    let index = e.currentTarget.dataset.index;
    if (this.data.assembles[index].is_complete == 0) {
      wx.navigateTo({
        url: '/bh_step/pages/AssembleDetail/AssembleDetail?goodid=' + this.data.assembles[index].id
      })
    } else if (this.data.assembles[index].is_complete == 4) {
      this.showToast('该商品已过期');
    } else {
      wx.navigateTo({
        url: '/bh_step/pages/checkOrderAssemble/checkOrderAssemble?type=1&orderid=' + this.data.assembles[index].order_id + '&goodid=' + this.data.assembles[index].id
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
      url: "entry/wxapp/groupGoodsList",
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
        if (res.info.goods_list.length > 0) {
          that.setData({
            p_bargain: (that.data.p_bargain + 1),
            bargains: that.data.bargains.concat(res.info.goods_list)
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

  toBargainDetail: function(e) {
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/bh_step/pages/bargaindetail/bargaindetail?type=' + 0
    })
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
      url: "entry/wxapp/auctionList",
      data: {
        p_size: that.data.p_size,
        p: that.data.p_auction
      },
      success: function(res) {
        that.setData({
          isLoadAuction: false
        })
        if (res.info.goods_list.length > 0) {
          that.setData({
            p_auction: (that.data.p_auction + 1),
            auctions: that.data.auctions.concat(res.info.goods_list)
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

  toAuctionDetail: function(e) {
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/bh_step/pages/auctionDetail/auctionDetail?type=' + 0
    })
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

  onLoad: function(t) {
    this.setData({
      img_url: app.siteInfo.siteroot.replace(/app\/index.php/, "") + app.img_url
    }), $this = this;

    this.getBystepList();
    this.getAssembleList();
    this.getBargainList();
    this.getAuctionList();
    this.getUserInfo();
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
      url: "entry/wxapp/shopping",
      data: {
        token: wx.getStorageSync("token")
      },
      success: function(t) {
        $this.setData(t.info), $this.setData({
          data: t.info
        });
      }
    });
    this.setData({
      auctions: [],
      p_auction: 1, //竞拍
      bysteps: [],
      p_bystep: 1, //拼步
      assembles: [],
      p_assemble: 1, //拼团
      bargains: [],
      p_bargain: 1, //砍价
    })
    this.getBystepList();
    this.getAssembleList();
    this.getBargainList();
    // this.getUserInfo();
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {
    if (this.data.currentGoods == 4) {
      this.getBystepList();
    } else if (this.data.currentGoods == 3) {
      this.getAuctionList();
    } else if (this.data.currentGoods == 5) {
      this.getAssembleList();
    } else if (this.data.currentGoods == 6) {
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
  advjump: function() {
    2 == $this.data.data.advertisement.type ? wx.navigateTo({
      url: $this.data.data.advertisement.path,
      fail: function(t) {
        console.log($this.data.data.advertisement.path), wx.switchTab({
          url: $this.data.data.advertisement.path
        });
      }
    }) : wx.navigateToMiniProgram({
      appId: $this.data.data.advertisement.appid,
      path: $this.data.data.advertisement.path,
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
  goodsDetails: function(t) {
    var e = t.currentTarget.dataset.id,
      a = t.currentTarget.dataset.etype,
      o = 2 == a || 3 == a ? "../goods/goods?id=" : "../currencyGoods/currencyGoods?id=";
    wx.navigateTo({
      url: o + e
    });
  }
});