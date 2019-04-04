// bh_step/pages/publicredpkg/publicredpkg.js
var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);
var util = require("../../../we7/resource/js/util.js");

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
    canRecTypes: [],
    screenheight: 0,
    screenWidth: 0,
    showPicRecType: false,
    showMore: true,
    showPay: false,

    templimitUsers: 0,
    uploadedPic: [],

    postText: '',
    pics: [],
    postRedpkgNum: 0,
    postMoney: 0,
    publishRange: {},
    loc: {},
    limitUsers: [],
    linkTitle: '',
    linkUrl: '',
  },

  chosePic: function () {
    var _this = this
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        _this.setData({
          pics: res.tempFilePaths.concat(_this.data.pics)
        })
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  },

  showPickRecType: function (e) {
    this.setData({
      showPicRecType: e.currentTarget.dataset.show
    });
  },

  showPickRecTypeSure: function (e) {
    this.setData({
      showPicRecType: e.currentTarget.dataset.show
    });
    this.setData({
      limitUsers: this.data.canRecTypes[this.data.templimitUsers],
      templimitUsers: 0
    })
  },

  toSelectLoc: function () {
    var that = this;
    wx.navigateTo({
      url: '/bh_step/pages/selectloc/selectloc?lat=' + that.data.loc.lat + '&lon=' + that.data.loc.lon
    })
  },

  postTextChange: function (e) {
    this.setData({
      postText: e.detail.value
    })
  },

  postRedpkgNumChange: function (e) {
    this.setData({
      postRedpkgNum: e.detail.value
    })
  },

  postMoneyChange: function (e) {
    this.setData({
      postMoney: e.detail.value
    })
  },

  postLinkTitleChange: function (e) {
    this.setData({
      linkTitle: e.detail.value
    })
  },

  postLinkUrlChange: function (e) {
    this.setData({
      linkUrl: e.detail.value
    })
  },

  bindChange: function(e) {
    this.setData({
      templimitUsers: e.detail.value[0]
    })
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
    this.getPostLimitUsers();
  },

  getPostLimitUsers: function () {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/postRedPacketLimit",
      data: {
      },
      success: function (t) {
        that.setData({
          canRecTypes: t.info
        })
      }
    });
  },

  showMoreSet: function () {
    this.setData({
      showMore: !this.data.showMore
    })
  },

  removePic: function (e) {
    this.data.pics.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      pics: this.data.pics
    })
  },

  publish: function (e) {
    if (this.data.postText == null || this.data.postText == ''){
      this.showToast("请输入帖子内容");
      return;
    }
    if (this.data.pics == null || this.data.pics.length <= 0){
      this.showToast("请选择帖子图片");
      return;
    }
    if (parseFloat(this.data.postRedpkgNum ).toString() == 'NaN' || this.data.postRedpkgNum <= 0){
      this.showToast("请填写红包个数");
      return;
    }
    if (parseFloat(this.data.postMoney).toString() == 'NaN' || this.data.postMoney <= 0){
      this.showToast("请填写红包金额");
      return;
    }
    if (parseFloat(this.data.postMoney).toString() != 'NaN' && (this.data.postMoney < 1 || this.data.postMoney > 1000)){
      this.showToast("红包总金额1-1000元");
      return;
    }
    if (this.data.postMoney * 1.0 / this.data.postRedpkgNum < 0.1){
      this.showToast("单个红包最低0.1元");
      return;
    }
    if (this.data.publishRange == null || this.data.publishRange.title == 'undefined' 
      || this.data.publishRange.title == null || this.data.publishRange.title==''){
      this.showToast("请选择帖子位置范围");
      return;
    }
    // if (this.data.limitUsers == null || this.data.limitUsers.title == 'undefined'
    //   || this.data.limitUsers.title == null || this.data.limitUsers.title == ''){
    //   this.showToast("请选择谁可以领取你的红包");
    //   return;
    // }
    this.setData({
      showPay: true
    })
  },

  checkPay: function (e) {
    console.log("checkPay: " + e.detail.payType);
    wx.showLoading({
      title: '上传图片中',
      mask: !0
    })
    this.uploadPic(e.detail.payType);
  },

  uploadPic: function (payType) {
    var that = this; 
    let url = util.getFullUrl({
      method: "get",
      url: "entry/wxapp/upload",
      data: {
      }
    });
    //this.getFullUrl('entry/wxapp/upload') + 'token=' + wx.getStorageSync("token");
    //console.log("---->" + that.data.pics[that.data.uploadedPic.length]);
    wx.uploadFile({
      url: url,
      filePath: that.data.pics[that.data.uploadedPic.length],
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        token: wx.getStorageSync("token")
      },
      success(res) {
        //console.log("success---->" + JSON.stringify(res) + ":::" + res.data.info);
        let data = JSON.parse(res.data);
        let tempUploadedPic = that.data.uploadedPic;
        tempUploadedPic[that.data.uploadedPic.length] = data.info;
        that.setData({
          uploadedPic: tempUploadedPic
        })
        if (that.data.uploadedPic.length < that.data.pics.length){
          that.uploadPic(payType);
          //console.log("not end---->" + JSON.stringify(that.data.uploadedPic));
        }else{
          console.log("end---->" + JSON.stringify(that.data.uploadedPic));
          wx.hideLoading();
          that.publishPost(payType);
        }
      },
      fail(res) {
        that.showToast("上传图片失败");
        wx.hideLoading();
        that.setData({
          uploadedPic: []
        })
      }
    })
  },

  publishPost: function (payType) {
    var that = this;
    let picStrs = that.getPicStr();
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/memberPost",
      data: {
        title: that.data.postText,
        pic: picStrs,
        red_packet_number: that.data.postRedpkgNum,
        pay_money: that.data.postMoney,
        location_range: that.data.publishRange.id,
        lon: that.data.loc.lon,
        lat: that.data.loc.lat,
        city: that.data.loc.city,
        area: that.data.loc.area,
        receive_range: (that.data.limitUsers.id == null ? 1 : that.data.limitUsers.id),
        site_url_title: that.data.linkTitle,
        site_url_link: that.data.linkUrl,
        pay_type: payType,
        token: wx.getStorageSync("token")
      },
      success: function (t) {
        console.log("---->" + JSON.stringify(t));
        if (t.status == 1){
          that.showToast('发布成功');
          wx.navigateBack({
            delta: 1,
          });
        } else if (t.status == 2){
          that.wexinPay(t.info.pay_data);
        }
      }
    });
  },

  getPicStr: function (payType) {
    let tempStr = '';
    for (var i = 0; i < this.data.uploadedPic.length; i++){
      if(i != 0){
        tempStr = tempStr + ",";
      }
      tempStr = tempStr + this.data.uploadedPic[i];
    }
    return tempStr;
  },

  wexinPay: function(data){
    var that = this;
    wx.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: data.signType,
      paySign: data.paySign,
      success: function (res) {
        that.showToast('发布成功');
        wx.navigateBack({
          delta: 1,
        });
      },
      fail: function (res) {
        that.showToast("支付失败");
      }
    })
  },

  showToast: function (str) {
    wx.showToast({
      title: str,
      icon: 'none',
      duration: 1500,
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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