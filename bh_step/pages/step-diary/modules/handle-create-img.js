function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../../util/wx-promisify/wx-promisify.js")), s = e(require("./base-canvas-palette.js")), a = (0, 
t.default)(wx.saveImageToPhotosAlbum);

exports.default = {
    doCreateImg: function(e) {
        var t = e.data, o = t.posterInfo, a = t.userInfo, n = t.date, i = t.stepNum, r = t.qrcodeUrl;
        console.log(1111111), console.log(o), e.setData({
            template: new s.default({
                userIcon: a && a.avatar_url,
                userName: a && a.nick_name,
                date: a && n,
                posterImg: o.posterImg,
                qrCodeImg: r,
                stepNum: i,
                stepNumCss: o.stepNumCss,
                useNameCss: o.useNameCss,
                dateCss: o.dateCss,
                xcx_title: t.xcx_title
            }).palette()
        });
    },
    createImgScuess: function(t, e) {
        t.imagePath = e.detail.path, wx.hideLoading(), console.log("=====生成图片成功========="), 
        a({
            filePath: t.imagePath
        }).then(function() {
            wx.showToast({
                title: "保存图片成功！",
                icon: "none"
            });
        }).catch(function(e) {
            console.log("保存图片失败了:" + JSON.stringify(e)), console.log(e), -1 != e.errMsg.indexOf("auth") && t.setData({
                requestAuthType: 2,
                isShowOpensettingDialog: !0
            });
        });
    },
    createImgFail: function(e) {
        wx.hideLoading(), wx.showToast({
            title: "生成图片失败",
            icon: "none"
        }), console.error("=======生成图片失败=======:" + JSON.stringify(e));
    }
};