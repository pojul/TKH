// bh_step/component/sex_picker/sex_picker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: { //控制area_select显示隐藏
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //0: 未知; 1: 男; 2: 女
    sexs: ['男', '女'],
    value: [0],
    sex: 1, 
  },

  ready: function () {
    this.setData({
      value: [0],
      sex: 1
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showPickRecType: function (e) {
      this.setData({
        show: e.currentTarget.dataset.show
      });
    },

    showPickRecTypeCheck: function (e) {
      this.setData({
        show: e.currentTarget.dataset.show
      });
      this.triggerEvent('checkSex', { sex: this.data.sex});
    },

    bindChange: function (e) {
      this.data.value = e.detail.value;
      this.setData({
        sex: (e.detail.value[0] + 1)
      })
    },
  }
})
