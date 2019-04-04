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
    showCards: false,
    cardsViewWidth: 0,
    cardsScrollX: 0,
    currentCard: 0,
    touchesStartX: 0,
    redPkgs: [],
    showRedPkgIndex: 0,
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
        that.getTerrirotyMemberList();
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
        that.getTerritoryRedPacket();
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
    for (let i = 0; i < that.data.memberList.length; i++){
      let member = that.data.memberList[i];
      wx.downloadFile({
        url: member.head,
        success: (pathInfo) => {
          let marker = {
            iconPath: pathInfo.tempFilePath,
            id: (i * 2),
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
    // if (!this.data.memberList) {
    //   return;
    // }
    this.setData({
      //
      cardsViewWidth: (600 * that.data.screenWidth / 750 * this.data.memberList.length * 2),
      cardsScrollX: (-562 * that.data.screenWidth / 750 * this.data.currentCard + 90 * this.data.screenWidth / 750)
    })
  },

  getTerritoryRedPacket: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/territoryRedPacket",
      data: {
      },
      success: function (t) {
        that.setData({
          redPkgs: t.info
        })
        for (let j = 0; j < t.info.length;j++){
          that.setRedPkgMarks(t.info[j].post_id, j);
        }
        console.log(t.info.length + "<-----getTerritoryRedPacket---->" + JSON.stringify(that.data.markers))
      }
    });
  },

  setRedPkgMarks: function (postid, index) {
    var that = this;
    let randomLat = Math.random() > 0.5 ? (that.data.mylatitude + Math.random() * 0.006) : (that.data.mylatitude - Math.random() * 0.006);
    let randomLon = Math.random() > 0.5 ? (that.data.mylongitude + Math.random() * 0.007) : (that.data.mylongitude - Math.random() * 0.007);
    let marker = {
      iconPath: '../../images/red_package.png',
      id: (index * 2 + 1),
      latitude: randomLat,
      longitude: randomLon,
      width: 30,
      height: 30,
    }
    let startIndex = 0;
    if (that.data.memberList){
      startIndex = that.data.memberList.length
    }
    that.data.markers[(startIndex + index)] = marker;
    this.setData({
      markers: that.data.markers
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

  mapClick: function (e) {
    this.setData({
      showCards: false
    })
  },

  markerClick: function (e) {
    console.log("markerClick" + JSON.stringify(e));
    if (e.markerId%2 == 0){
      this.onMemberMkClick((e.markerId)/2);
    }else{
      this.onRedpkgMkClick((e.markerId-1)/2);
    }
  },

  onMemberMkClick: function (index) {
    console.log(JSON.stringify(this.data.memberList))
    this.setData({
      currentCard: index,
      showCards: true
    })
  },

  onRedpkgMkClick: function (index) {
    this.setData({
      showOpenRedpkg: true,
      showRedPkgIndex: index
    })
  },

  onTouchStart: function (e) {
    this.setData({
      touchesStartX: e.touches[0].pageX
    })
  },

  onTouchMove: function (e) {
    let dsx = e.touches[0].pageX - this.data.touchesStartX;
    let dsxRpx = (this.data.cardsScrollX + dsx * 750 / this.data.screenWidth);

    if (Math.abs(dsx) < 10 || dsxRpx < (-567 * (this.data.memberList.length - 1) + 80) || 
      dsxRpx > (-567 * 0 + 80)){
      return;
    }
    this.setData({
      cardsScrollX: dsxRpx,
      touchesStartX: e.touches[0].pageX
    })
  },

  closeRedpkg: function (e) {
    this.setData({
      showOpenRedpkg: false
    })
  },

  toRedRkgInfo: function (e) {
    this.setData({
      showOpenRedpkg: false
    })
    wx.navigateTo({
      url: '/bh_step/pages/redpkginfo/redpkginfo?post_id=' + e.currentTarget.dataset.postid
    })
  },

  touchEnd: function (e) {
    
  },

  toPublishRedpkg: function () {
    wx.navigateTo({
      url: '/bh_step/pages/publicredpkgnote/publicredpkgnote'
    })
  },

  toHomePage: function (e) {
    wx.navigateTo({
      url: '/bh_step/pages/homepage/homepage?member_id=' + e.currentTarget.dataset.memberid
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
    //this.getLocation();
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
    this.getLocation()
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