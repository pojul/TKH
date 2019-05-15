var app = getApp(),
  request = function(o) {
    console.log(o), o.data.version = "2.2.5", app.util.request({
      method: o.method || "get",
      url: o.url,
      data: o.data,
      cachetime: 0,
      showLoading: !1,
      success: function(t) {
        var e = t.data.status; -
          1 == e ? login(o) : (0 == e && t.data.info.indexOf("code been used") < 0)? wx.showModal({
          // -1 == e ? wx.showModal({
          //   title: "提示",
          //   mask: !0,
          //   content: '用户未登陆',
          //   showCancel: !1
          // }) : 0 == e ? wx.showModal({
          title: "提示",
          mask: !0,
          content: t.data.info,
          showCancel: !1
        }) : -2 == e ? validateAuthorize(o) : o.success(t.data);
        if (0 == e){
          o.fail(t.data);
        }
      },
      fail: function() {
        wx.showModal({
          title: "提示",
          mask: !0,
          content: "未连接到服务器",
          showCancel: !1
        });
      }
    });
  },
  login = function(s) {
    wx.login({
      success: function(t) {
        // wx.getUserInfo({
        //   success: function(tuserinfo) {

            var e = wx.getStorageSync("parent_id"),
              o = wx.getStorageSync("goods_id"),
              n = wx.getStorageSync("share_tpye");
            request({
              method: "get",
              url: "entry/wxapp/login",
              data: {
                code: t.code,
                parent_id: e,
                goods_id: o,
                share_tpye: n,
                encryptedData: wx.getStorageSync("user_encryptedData"),
                iv: wx.getStorageSync("user_iv")
              },
              success: function(t) {
                console.log("wx.login----->" + JSON.stringify(t));
                wx.setStorageSync("member_type", t.info.member_type);
                if (wx.setStorageSync("token", t.info.token), null != s) return s.data.token = t.info.token,
                  void request(s);
              }
            });


        //   },
        //   fail: function(tuserinfo) {
        //     wx.showModal({
        //       title: "提示",
        //       mask: !0,
        //       content: "获取用户信息失败",
        //       showCancel: !1
        //     });
        //   }
        // });

      },
      fail: function() {}
    });
  },
  validateAuthorize = function e(o) {
    wx.showModal({
      title: "提示",
      content: "asjjasjsajjsjjsaj",
      showCancel: !1,
      success: function(t) {
        wx.openSetting({
          success: function(t) {
            t.authSetting["scope.werun"] ? null != o && wx.getWeRunData({
              success: request(o)
            }) : e();
          }
        });
      }
    });
  };

module.exports = {
  request: request
};