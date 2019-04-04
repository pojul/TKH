// bh_step/component/reply_dialog/reply_dialog.js
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
    replyDialogText: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    replyDialogTextChange: function(e){
      this.setData({
        replyDialogText: e.detail.value
      })
    },

    cancel: function () {
      console.log("cancel");
      this.setData({
        show: false
      })
    },

    sure: function () {
      if(this.data.replyDialogText == ''){
        this.showToast('回复内容不能为空');
        return;
      }
      this.triggerEvent('checkReply', { text: this.data.replyDialogText });
      this.setData({
        show: false
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
  }
})
