// bh_step/pages/selectloc/selectloc.js
var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

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
    mylongitude: 0,
    mylatitude: 0,
    screenWidth: 0,
    screenHeight: 100,
    circles: {},
    markers: [],
    city: '',
    district: '',
    terriroty: {},
    memberList: [],
    cards: [
      {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
    ],
    showCards: true,
    cardsViewWidth: 0,
    cardsScrollX: 0,
    currentCard: 0,
    touchesStartX: 0,
  },

  getLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: function (res) {
        that.setData({
          mylongitude: res.longitude,
          mylatitude: res.latitude,
          circles: [{
            latitude: res.latitude,
            longitude: res.longitude,
            color: '#000000DD',
            fillColor: '#00000000',
            radius: 1000,
            strokeWidth: 1
          }],
        });
        that.loadCity();
      }
    })
  },

  getSystemInfo: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth
        });
      }
    });
  },

  loadCity: function () {
    var that = this
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + that.data.mylatitude + ',' + that.data.mylongitude + '&key=FNTBZ-RGJLX-LNN4X-T3SFM-AM3Y2-IPF2H',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          city: res.data.result.address_component.city,
          district: res.data.result.address_component.district
        })
        that.getTerriroty();
        that.getTerrirotyMemberList();
      }
    }) 
  },

  getTerriroty: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/terrirotyInfo",
      data: {
        lon: that.data.mylongitude,
        lat: that.data.mylatitude,
        area: that.data.district,
        city: that.data.city
      },
      success: function (t) {
        that.setData({
          terriroty: t.info.territory
        })
      }
    });
  },

  getTerrirotyMemberList: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/terrirotyMemberList",
      data: {
        lon: that.data.mylongitude,
        lat: that.data.mylatitude
      },
      success: function (t) {
        that.setData({
          memberList: t.info.territory_member
        })
        that.updateMembers();
        //console.log(JSON.stringify(t))
      }
    });
  },

  updateMembers: function () {
    if (!this.data.memberList){
      return;
    }
    var that = this;
    let tempMarkers = [];
    for (var i = 0; i < that.data.memberList.length; i++){
      let member = that.data.memberList[i];
      wx.downloadFile({
        url: member.head,
        success: (pathInfo) => {
          let marker = {
            iconPath: pathInfo.tempFilePath,
            id: member.id,
            latitude: member.lat,
            longitude: member.lon,
            width: 30,
            height: 30,
          }
          that.data.markers[i] = marker;
          this.setData({
            markers: that.data.markers
          })
        }
      })
    }
    this.setData({
      //this.data.currentCard
      cardsViewWidth: (600 * that.data.screenWidth/750 * this.data.cards.length * 2),
      cardsScrollX: (-562 * that.data.screenWidth / 750 * 16 + 90 * this.data.screenWidth / 750)
    })
  },

  toMyLoc: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: function (res) {
        that.setData({
          mylongitude: res.longitude,
          mylatitude: res.latitude
        });
      }
    })
  },

  onTouchStart: function (e) {
    //console.log("onTouchStart---->" + JSON.stringify(e));
    this.setData({
      touchesStartX: e.touches[0].pageX
    })
  },

  onTouchMove: function (e) {
    //console.log("onTouchMove---->" + JSON.stringify(e));
    let dsx = e.touches[0].pageX - this.data.touchesStartX;
    let dsxRpx = (this.data.cardsScrollX + dsx * 750 / this.data.screenWidth);

    if (Math.abs(dsx) < 10 || dsxRpx < (-567 * (this.data.cards.length - 1) + 80) || 
      dsxRpx > (-567 * 0 + 80)){
      return;
    }
    //console.log("onTouchMove---->" + dsxRpx);
    this.setData({
      cardsScrollX: dsxRpx,
      touchesStartX: e.touches[0].pageX
    })
  },

  touchEnd: function (e) {
    console.log("touchEnd---->" + JSON.stringify(e));
  },

  toPublishRedpkg: function () {
    wx.navigateTo({
      url: '/bh_step/pages/publicredpkgnote/publicredpkgnote'
    })
  },

  toRedpkgrecord: function () {
    wx.navigateTo({
      url: '/bh_step/pages/redpkgrecord/redpkgrecord'
    })
  },

  tostrategyList: function () {
    wx.navigateTo({
      url: '/bh_step/pages/strategylist/strategylist'
    })
  },

  toLairdPage: function () {
    if (!this.data.terriroty || this.data.terriroty.id < 0){
      return;
    }
    var that = this;
    wx.navigateTo({
      url: '/bh_step/pages/laird/laird?terriroty_id=' + that.data.terriroty.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemInfo();
    this.getLocation();
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  }
})