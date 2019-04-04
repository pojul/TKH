// bh_step/component/UserInfoDialog/UserInfoDialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    refuse: function(){
      this.setData({
        show: false
      })
      this.triggerEvent('authorize', { authorized: false });
    },
    getAuthorize(t) {
      if ("getUserInfo:ok" == t.detail.errMsg) {
        wx.setStorageSync("user_encryptedData", t.detail.encryptedData);
        wx.setStorageSync("user_iv", t.detail.iv)
        this.triggerEvent('authorize', { authorized: true });
      } else {
        console.log("用户拒绝了");
        this.triggerEvent('authorize', { authorized: false });
      } 
      this.setData({
        show: false
      })
    }
  }
})
