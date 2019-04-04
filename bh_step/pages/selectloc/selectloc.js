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
    currentRange: 0,
    mylongitude: 118.324520,
    mylatitude: 36.099994,
    screenheight: 0,
    screenWidth: 0,
    mapHeight: 0,
    locWidth: 0,
    locHeight: 0,
    locBottom: 0,
    locLeft: 0,

    province: '',
    city: '',
    area: '',
    show: false,
    publishRange: [],

  },

  sureSelectAreaListener: function (e) {
    var that = this;
    that.setData({
      show: false,
      province: e.detail.currentTarget.dataset.province,
      city: e.detail.currentTarget.dataset.city,
      area: e.detail.currentTarget.dataset.area
    })
  },

  choseCity: function (e) {
    this.setData({
      show: e.currentTarget.dataset.show
    })
  },

  setRange: function (e) {
    this.setData({
      currentRange: e.currentTarget.dataset.range
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenheight: res.windowHeight,
          screenWidth: res.windowWidth,
        });
      },
    })
    if (options.lat != null && options.lon != null &&
      options.lat!="undefined" && options.lon!="undefined"){
      that.setData({
        mylongitude: options.lon,
        mylatitude: options.lat
      })
    }else{
      this.toMyLoc();
    }
    this.getMapHeight();
    this.getLocHeight();
    this.getPublishRange();
  },

  getPublishRange: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/postRedPacketRange",
      data: {
      },
      success: function (t) {
        that.setData({
          publishRange: t.info
        })
      }
    });
  },
  
  toMyLoc: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        that.setData({
          mylongitude: res.longitude,
          mylatitude: res.latitude,
        });
      }
    })
  },

  getMapHeight: function(){
    var query = wx.createSelectorQuery();
    var that = this;
    query.select('.top-box').boundingClientRect(function (rect) {
      that.setData({
        mapHeight: (that.data.screenheight - rect.height)
      })
    }).exec();
  },

  getLocHeight: function () {
    var query = wx.createSelectorQuery();
    //选择id
    var that = this;
    query.select('.loc').boundingClientRect(function (rect) {
      that.setData({
        locWidth: rect.width,
        locHeight: rect.height
      })
      that.setLocPos();
    }).exec();
  },

  setLocPos: function () {
      this.setData({
        locBottom: (this.data.mapHeight - this.data.locHeight) / 2,
        locLeft: (this.data.screenWidth - this.data.locWidth) / 2
      })
  },

  sureClick: function () {
    this.getCenterLatLon();
  },

  getCenterLatLon: function () {
    let that = this;
    this.mapCtx = wx.createMapContext("map");
    this.mapCtx.getCenterLocation({
      type: 'gcj02',
      success: function (res) {
        that.getDistrict(res.latitude, res.longitude);
      }
    })
  },

  getDistrict(latitude, longitude) {
    let that = this;
    wx.request({
      url: "https://apis.map.qq.com/ws/geocoder/v1/?location=" +
        latitude + "," + longitude + "&key=FNTBZ-RGJLX-LNN4X-T3SFM-AM3Y2-IPF2H",
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //console.log("getDistrict: " + JSON.stringify(res));
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        let tempLoc = {
          lat: latitude,
          lon: longitude,
          city: res.data.result.address_component.city,
          area: res.data.result.address_component.district
        };
        let tempPublicRange = that.data.publishRange[that.data.currentRange];
        prevPage.setData({
          publishRange: tempPublicRange, 
          loc: tempLoc
        });
        wx.navigateBack({
            delta: 1,
        })
        
      }
    })
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