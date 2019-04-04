function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Page({
    data: {
        isShowOpensettingDialog: !1,
        template: {},
        creatScuess: !1
    },
    onLoad: function(e) {
        console.log("=======生成图片收到的参数========"), console.log(e), this.goodsImg = decodeURIComponent(e.goodsImg), 
        this.goodsName = decodeURIComponent(e.goodsName), this.goodsPrice = e.goodsPrice, 
        this.sence = e.sence, this.careteImg();
    },
    saveImgBtnClick: function() {
        var o = this;
        g({
            filePath: this.imagePath
        }).then(function() {
            wx.showToast({
                title: "保存图片成功！",
                icon: "none"
            });
        }).catch(function(e) {
            console.log("保存图片失败了"), console.log(e), -1 != e.errMsg.indexOf("auth") && o.setData({
                isShowOpensettingDialog: !0
            });
        });
        try {
            getApp().sensors.track("XMClick", {
                ck_module: "保存海报图片",
                page: "凑好友详情页",
                contentid: this.goodsName
            });
        } catch (o) {}
    },
    careteImg: function() {
        var o = this;
        wx.showLoading({
            title: "图片生成中",
            mask: !0
        }), Promise.all([ (0, i.default)(), (0, s.default)("pages/index/index", this.sence) ]).then(function(e) {
            o.setData({
                template: new t.default({
                    bgImg: n.default.getTinyImg("https://img.xmiles.cn/bubuzhuan/goods-share-img-bg-2.png"),
                    logo: n.default.getTinyImg("https://img.xmiles.cn/bubuzhuan/goods-share-img-logo.png"),
                    goodsImg: o.goodsImg,
                    userIcon: e[0] && e[0].userInfo && e[0].userInfo.avatar_url,
                    qrCodeImg: e[1],
                    inviteTip: "我在0元兑换这个宝贝，扫码来一起领",
                    goodsName: o.goodsName,
                    goodsPrice: "价值 ￥" + o.goodsPrice
                }).palette()
            });
        }).catch(function(e) {
            console.error("获取菊花二维码失败了：" + JSON.stringify(e)), o.handleError();
        });
    },
    onImgOK: function(e) {
        this.imagePath = e.detail.path, console.log(e), this.setData({
            creatScuess: !0
        }), wx.hideLoading();
    },
    imgErr: function(e) {
        this.handleError();
    },
    onShow: function() {},
    openSettingBtnClick: function() {
        this.setData({
            isShowOpensettingDialog: !1
        });
    },
    onShareAppMessage: function() {
        return a.default.get("", getApp(), {
            page: "生成分享海报页",
            share_module: "右上角分享"
        });
    },
    handleError: function() {
        wx.hideLoading(), wx.showToast({
            title: "失败了，请重试",
            icon: "none"
        });
    }
});