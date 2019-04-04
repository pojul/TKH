// bh_step/pages/busycircle/busycircle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    business: [
      {
        text: '上等仁嘉智慧空间，在全市范围内展开平面设计业务、空间设计业务上等仁嘉智慧空间，在全市范围内展开平面设计业务、空间设计业务',
        pics: [
          'https://img04.sogoucdn.com/app/a/100520021/4dbea06569f18fbcd69dab516a098d60',
          'https://img03.sogoucdn.com/app/a/100520024/ec5ffdf668e10f8a6e091661120c7276',
          'https://img03.sogoucdn.com/app/a/100520024/8102cab23e946d9a7a07e43c36f3e557',
          'https://img04.sogoucdn.com/app/a/100520024/e8dc3b0932c120260b56459b25583036'
        ]
      },
      {
        text: '上等仁嘉智慧空间，在全市范围内展开平面设计业务、空间设计业务上等仁嘉智慧空间，在全市范围内展开平面设计业务、空间设计业务',
        pics: [
          'https://img04.sogoucdn.com/app/a/100520024/cdf99e71142e66d6337c2f3a1f888411',
          'https://img02.sogoucdn.com/app/a/100520024/6c2d1ba39cdf0a949046a4669ac38ac1',
          'https://img01.sogoucdn.com/app/a/100520024/e551bc9145f2d57f470de5ef146ecef3',
          'https://img04.sogoucdn.com/app/a/100520024/e8dc3b0932c120260b56459b25583036',
          'https://img04.sogoucdn.com/app/a/100520024/e8dc3b0932c120260b56459b25583036'
        ]
      },
      {
        text: '上等仁嘉智慧空间，在全市范围内展开平面设计业务、空间设计业务上等仁嘉智慧空间，在全市范围内展开平面设计业务、空间设计业务',
        pics: [
          'https://img04.sogoucdn.com/app/a/100520021/4dbea06569f18fbcd69dab516a098d60',
          'https://img03.sogoucdn.com/app/a/100520024/ec5ffdf668e10f8a6e091661120c7276',
          'https://img03.sogoucdn.com/app/a/100520024/8102cab23e946d9a7a07e43c36f3e557',
          'https://img04.sogoucdn.com/app/a/100520024/e8dc3b0932c120260b56459b25583036'
        ]
      },
      {
        text: '上等仁嘉智慧空间，在全市范围内展开平面设计业务、空间设计业务上等仁嘉智慧空间，在全市范围内展开平面设计业务、空间设计业务',
        pics: [
          'https://img04.sogoucdn.com/app/a/100520021/4dbea06569f18fbcd69dab516a098d60',
          'https://img03.sogoucdn.com/app/a/100520024/ec5ffdf668e10f8a6e091661120c7276',
          'https://img03.sogoucdn.com/app/a/100520024/8102cab23e946d9a7a07e43c36f3e557',
          'https://img04.sogoucdn.com/app/a/100520024/e8dc3b0932c120260b56459b25583036'
        ]
      },
    ]
  },

  toCollarMoney: function () {
    wx.navigateTo({
      url: '/bh_step/pages/collarmoney/collarmoney'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (var i = 0; i < this.data.business.length; i++){
      if (this.data.business[i] != null && this.data.business[i].text.length > 40){
        let newText = this.data.business[i].text.substring(0, 40) + "...";
        var key = "business["+ i + "].text";
        this.setData({
          [key]: newText
        });
      }
    }
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