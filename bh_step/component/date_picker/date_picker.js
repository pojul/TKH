// bh_step/component/date_picker/date_picker.js
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
    years: [

    ],
    months: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    ],
    days: [

    ],
    value: [80, 0, 0],
  },

  ready: function() {
    var year = new Date().getFullYear();
    var tempYear = [];
    for (var i = (year - 100); i <= year; i++) {
      tempYear[(i - (year - 100))] = i;
    }

    this.setData({
      years: tempYear,
      value: [80]
    })
    this.setDays(tempYear[80], 1);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showPickRecType: function(e) {
      console.log(e.currentTarget.dataset.show)
      this.setData({
        show: e.currentTarget.dataset.show
      });
    },

    isLeapYear: function(year) {
      return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
    },

    bindChange: function(e) {
      this.setDays(this.data.years[e.detail.value[0]], this.data.months[e.detail.value[1]]);
    },

    setDays: function(year, month) {
      console.log("setDays: " + year + "::" + month);
      var maxDays = 30;
      switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          maxDays = 31;
          break;
        case 2:
          if ((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)){
            maxDays = 29;
          }else{
            maxDays = 28;
          }
          break;
      }
      var tempDays = {};
      for(var i = 1; i <= maxDays; i ++){
        tempDays[i-1] = i;
      }
      this.setData({
        days: tempDays
      });
    },
  }
})