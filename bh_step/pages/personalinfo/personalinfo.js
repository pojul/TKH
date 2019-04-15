// bh_step/pages/personalinfo/personalinfo.js

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
    showDatePicker: false,
    showAreaPicker: false,
    showSexPicker: false,
    province: '',
    city: '',
    area: '',
    id: -1,
    userInfo: {},
    uploadPicId: null,
    uploadPicPath: null,
  },

  nickNameChange: function (e) {
    this.data.userInfo.nickname = e.detail.value;
    this.setData({
      userInfo: this.data.userInfo
    })
  },

  signatureChange: function (e) {
    this.data.userInfo.signature = e.detail.value;
    this.setData({
      userInfo: this.data.userInfo
    })
  },

  phoneChange: function (e) {
    this.data.userInfo.phone = e.detail.value;
    this.setData({
      userInfo: this.data.userInfo
    })
  },

  checkArea: function (e) {
    //console.log("checkArea---->" + JSON.stringify(e))
    this.data.userInfo.province = e.detail.provice;
    this.data.userInfo.city = e.detail.city;
    this.setData({
      userInfo: this.data.userInfo
    })
  },

  checkDate: function (e) {
    let tempMonth = e.detail.month;
    let tempDay = e.detail.day;
    if (e.detail.month < 10){
      tempMonth = '0' +  e.detail.month;
    }
    if (e.detail.day < 10) {
      tempDay = '0' + e.detail.day;
    }
    this.data.userInfo.birthday = e.detail.year + "-" + tempMonth + "-" + tempDay;
    this.setData({
      userInfo: this.data.userInfo
    })
  },

  showSexPickView: function () {
    this.setData({
      showSexPicker: true
    })
  },

  checkSex: function (e) {
    this.data.userInfo.gender = e.detail.sex
    this.setData({
      userInfo: this.data.userInfo
    })
  },

  showDatePickView: function (options) {
    this.setData({
      showDatePicker: true
    })
  },

  chooseAddress: function () {
    this.setData({
      showAreaPicker: true
    })
  },

  getUserInfo: function (memberId) {
    var that = this;
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/userInfo",
      data: {
        view_member_id: that.data.id
      },
      success: function (t) {
        that.setData({
          userInfo: t.info.userInfo
        })
      }
    });
  },

  chosePic: function () {
    var _this = this
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        _this.uploadPic(res.tempFilePaths[0]);
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  },

  uploadPic: function (path) {
    var that = this;
    let url = util.getFullUrl({
      method: "get",
      url: "entry/wxapp/upload",
      data: {
      }
    });
    wx.showLoading({
      title: '上传图片中',
      mask: !0
    })
    wx.uploadFile({
      url: url,
      filePath: path,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        token: wx.getStorageSync("token")
      },
      success(res) {
        let data = JSON.parse(res.data);
        that.setData({
          uploadPicId: data.info,
          uploadPicPath: path
        })
        wx.hideLoading();
      },
      fail(res) {
        that.showToast("上传图片失败");
        wx.hideLoading();
      }
    })
  },

  saveEdit: function () {
    var that = this;
    if (!that.data.userInfo.birthday || that.data.userInfo.birthday == null || that.data.userInfo.birthday == ''){
      this.showToast('请添加生日');
      return;
    }

    if (!that.data.userInfo.province || that.data.userInfo.province == null || that.data.userInfo.province == '' || !that.data.userInfo.city || that.data.userInfo.city == null || that.data.userInfo.city == '') {
      this.showToast('请添加常驻地区');
      return;
    }

    if (!that.data.userInfo.phone || that.data.userInfo.phone == null || that.data.userInfo.phone == '') {
      this.showToast('请填写手机号');
      return;
    }
    let params = {
      nickname: that.data.userInfo.nickname,
      gender: that.data.userInfo.gender,
      province: that.data.userInfo.province,
      city: that.data.userInfo.city,
      signature: that.data.userInfo.signature,
      birthday: that.data.userInfo.birthday,
      phone: that.data.userInfo.phone
    };
    if (that.data.uploadPicId != null){
      params.avatar = that.data.uploadPicId;
    }
    wx.showLoading({
      title: '上传中',
      mask: !0
    })
    _tools2.default.request({
      method: "get",
      url: "entry/wxapp/updateUserInfo",
      data: params,
      success: function (t) {
        that.showToast("修改成功");
        wx.hideLoading();
        wx.navigateBack({})
      },
      fail(res) {
        wx.hideLoading();
      }
    });
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: wx.getStorageSync("member_id")
    })
    if (!this.data.id || this.data.id<0){
      this.showToast("数据错误");
      wx.navigateBack({
        delta: 1,
      });
      return;
    }
    this.getUserInfo();
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