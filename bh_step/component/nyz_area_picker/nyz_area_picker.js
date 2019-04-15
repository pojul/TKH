// common/nyz_area_picker/nyz_area_picker.js
//var areaTool = require('../../utils/area.js');
// var index = [0,0,0]
// var provinces = areaTool.getProvinces();
// var citys = areaTool.getCitys(index[0]);
// var areas = areaTool.getAreas(index[0],index[1]);

var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{    //控制area_select显示隐藏
      type:Boolean,
      value:false
    },
    maskShow:{    //是否显示蒙层
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    areaInfos: [],
    citys: [],
    areas: [],
    value: [0,0,0],
    tempArea: {},
    tempProvice: '',
    tempCity: '',
  },

  ready: function () {
    this.getAreaInfos();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleNYZAreaChange: function(e){
      this.setData({
        citys: this.data.areaInfos[e.detail.value[0]].city,
        areas: this.data.areaInfos[e.detail.value[0]].city[e.detail.value[1]].area,
        tempArea: this.data.areaInfos[e.detail.value[0]].city[e.detail.value[1]].area[e.detail.value[2]],
        tempProvice: this.data.areaInfos[e.detail.value[0]].name,
        tempCity: this.data.areaInfos[e.detail.value[0]].city[e.detail.value[1]].name
      })
    },
    /**
     * 确定按钮的点击事件
     */
    handleNYZAreaSelect: function(e){
      this.setData({
        show: false
      })
      this.triggerEvent('checkArea', { area: this.data.tempArea, provice: this.data.tempProvice, city: this.data.tempCity});
    },
    /**
     * 取消按钮的点击事件
     */
    handleNYZAreaCancle:function(e){
      this.setData({
        show:false
      })
    },

    getAreaInfos: function () {
      var that = this;
      _tools2.default.request({
        method: "get",
        url: "entry/wxapp/area",
        data: {
          token: wx.getStorageSync("token")
        },
        success: function (t) {
          that.setData({
            areaInfos: t.info,
            citys: t.info[0].city,
            areas: t.info[0].city[0].area,
            tempArea: t.info[0].city[0].area[0],
            tempProvice: t.info[0].name,
            tempCity: t.info[0].city[0].name
          })
        }
      });
    },
  }
})
