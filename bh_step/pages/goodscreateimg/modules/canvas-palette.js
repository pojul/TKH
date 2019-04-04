function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function o(t, e) {
        for (var r = 0; r < e.length; r++) {
            var o = e[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(t, e, r) {
        return e && o(t.prototype, e), r && o(t, r), t;
    };
}(), r = function() {
    function r(e) {
        t(this, r), this.bgImg = e.bgImg, this.logo = e.logo, this.goodsImg = e.goodsImg, 
        this.userIcon = e.userIcon, this.qrCodeImg = e.qrCodeImg, this.inviteTip = e.inviteTip, 
        this.goodsPrice = e.goodsPrice, this.goodsName = e.goodsName;
    }
    return e(r, [ {
        key: "palette",
        value: function() {
            return {
                width: "670rpx",
                height: "1030rpx",
                background: "rgba(255,255,255,0)",
                views: [ {
                    type: "image",
                    url: this.bgImg,
                    css: {
                        top: "0rpx",
                        left: "0rpx",
                        width: "671rpx",
                        height: "1032rpx",
                        mode: "scaleToFill"
                    }
                }, {
                    type: "image",
                    url: this.logo,
                    css: {
                        top: "22rpx",
                        left: "219rpx",
                        width: "54rpx",
                        height: "54rpx"
                    }
                }, {
                    type: "text",
                    text: "365步步赚",
                    css: {
                        top: "28rpx",
                        left: "286rpx",
                        align: "left",
                        maxLines: 1,
                        width: "200rpx",
                        color: "#434343",
                        fontSize: "34rpx",
                        fontWeight: "bold"
                    }
                }, {
                    type: "image",
                    url: this.userIcon,
                    css: {
                        top: "86rpx",
                        left: "55rpx",
                        width: "80rpx",
                        height: "80rpx",
                        borderRadius: "100rpx",
                        borderWidth: "2rpx",
                        borderColor: "rgba(38,188,197, 0.5)"
                    }
                }, {
                    type: "text",
                    text: this.inviteTip,
                    css: {
                        top: "106rpx",
                        left: "162rpx",
                        align: "left",
                        maxLines: 1,
                        width: "490rpx",
                        color: "#434343",
                        fontSize: "28rpx",
                        fontWeight: "bold"
                    }
                }, {
                    type: "image",
                    url: this.goodsImg,
                    css: {
                        top: "182rpx",
                        left: "116rpx",
                        width: "435rpx",
                        height: "435rpx",
                        borderRadius: "10rpx"
                    }
                }, {
                    type: "text",
                    text: this.goodsPrice,
                    css: {
                        top: "646rpx",
                        left: "335rpx",
                        align: "center",
                        maxLines: 1,
                        width: "548rpx",
                        color: "#FF8000",
                        fontSize: "42rpx",
                        fontWeight: "bold"
                    }
                }, {
                    type: "text",
                    text: this.goodsName,
                    css: {
                        top: "714rpx",
                        left: "335rpx",
                        align: "center",
                        maxLines: 1,
                        width: "548rpx",
                        color: "#434343",
                        fontSize: "26rpx"
                    }
                }, {
                    type: "rect",
                    css: {
                        bottom: "194rpx",
                        left: "238rpx",
                        width: "196rpx",
                        height: "20rpx",
                        color: "rgba(38,188,197, 0.5)"
                    }
                }, {
                    type: "text",
                    text: "0元白拿",
                    css: {
                        bottom: "202rpx",
                        left: "335rpx",
                        align: "center",
                        maxLines: 1,
                        width: "548rpx",
                        color: "#000000",
                        fontSize: "54rpx",
                        fontWeight: "bold"
                    }
                }, {
                    type: "text",
                    text: "长按识别小程序",
                    css: {
                        bottom: "104rpx",
                        left: "294rpx",
                        align: "left",
                        maxLines: 1,
                        color: "#666666",
                        fontSize: "32rpx"
                    }
                }, {
                    type: "text",
                    text: "步数换好礼",
                    css: {
                        bottom: "58rpx",
                        left: "294rpx",
                        align: "left",
                        maxLines: 1,
                        color: "#666666",
                        fontSize: "32rpx"
                    }
                }, {
                    type: "image",
                    url: this.qrCodeImg,
                    css: {
                        bottom: "30rpx",
                        left: "150rpx",
                        width: "126rpx",
                        height: "126rpx"
                    }
                } ]
            };
        }
    } ]), r;
}();

exports.default = r;