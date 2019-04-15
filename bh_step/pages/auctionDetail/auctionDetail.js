// bh_step/pages/auctionDetail/auctionDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {
      image: [
        'https://img01.sogoucdn.com/app/a/100520024/5744a89854553220cb1f6d78cb1744ad',
        'https://img04.sogoucdn.com/app/a/100520024/4ad7c665ba13d0ab6bd526f94056a2c2',
        'https://img03.sogoucdn.com/app/a/100520024/7b7acc0a7b5f3967dc356d4392ebce34'
      ]
    }
  },

  toRulesDetail: function () {
    wx.navigateTo({
      url: '/bh_step/pages/bystepRules/bystepRules?type=' + 2
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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