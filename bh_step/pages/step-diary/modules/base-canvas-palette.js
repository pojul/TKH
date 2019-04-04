function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function r(t, e) {
        for (var s = 0; s < e.length; s++) {
            var r = e[s];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(t, e, s) {
        return e && r(t.prototype, e), s && r(t, s), t;
    };
}(), s = function() {
    function s(e) {
        t(this, s), this.userIcon = e.userIcon, this.userName = e.userName, this.posterImg = e.posterImg, 
        this.qrCodeImg = e.qrCodeImg, this.date = e.date, this.stepNum = e.stepNum + "", 
        this.stepNumCss = e.stepNumCss, this.useNameCss = e.useNameCss, this.dateCss = e.dateCss, 
        this.xcx_title = e.xcx_title;
    }
    return e(s, [ {
        key: "palette",
        value: function() {
            return console.log(this.stepNumCss), {
                width: "690rpx",
                height: "806rpx",
                background: "#fff",
                views: [ {
                    type: "rect",
                    css: {
                        top: "-2px",
                        left: "-2px",
                        width: "694rpx",
                        height: "814rpx",
                        color: "#ffffff"
                    }
                }, {
                    type: "image",
                    url: this.posterImg,
                    css: {
                        top: "20rpx",
                        left: "20rpx",
                        width: "650rpx",
                        height: "622rpx",
                        mode: "scaleToFill"
                    }
                }, {
                    type: "image",
                    url: this.userIcon,
                    css: {
                        bottom: "200rpx",
                        left: "50rpx",
                        width: "96rpx",
                        height: "96rpx",
                        borderRadius: "100px",
                        borderWidth: "1px",
                        borderColor: "#ffffff"
                    }
                }, {
                    type: "text",
                    text: this.userName,
                    css: Object.assign({
                        bottom: "256rpx",
                        left: "166rpx",
                        align: "left",
                        maxLines: 1,
                        width: "300rpx",
                        color: "#ffffff",
                        fontSize: "36rpx",
                        fontWeight: "bold"
                    }, this.useNameCss)
                }, {
                    type: "text",
                    text: this.date,
                    css: Object.assign({
                        bottom: "210rpx",
                        left: "166rpx",
                        align: "left",
                        maxLines: 1,
                        width: "200rpx",
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "26rpx",
                        fontWeight: "normal"
                    }, this.dateCss)
                }, {
                    type: "text",
                    text: this.stepNum,
                    css: Object.assign({
                        fontSize: "70rpx"
                    }, this.stepNumCss)
                }, {
                    type: "image",
                    url: this.qrCodeImg,
                    css: {
                        bottom: "20rpx",
                        left: "50rpx",
                        width: "124rpx",
                        height: "124rpx"
                    }
                }, {
                    type: "text",
                    text: "长按扫码加入「" + this.xcx_title + "」",
                    css: {
                        bottom: "92rpx",
                        left: "197rpx",
                        align: "left",
                        maxLines: 1,
                        width: "450rpx",
                        color: "#666666",
                        fontSize: "24rpx"
                    }
                }, {
                    type: "text",
                    text: "每天可免费领取现金红包",
                    css: {
                        bottom: "42rpx",
                        left: "197rpx",
                        align: "left",
                        maxLines: 1,
                        width: "450rpx",
                        color: "#666666",
                        fontSize: "24rpx"
                    }
                } ]
            };
        }
    } ]), s;
}();

exports.default = s;