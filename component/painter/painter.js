function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e() {
    String.prototype.toPx = function(t) {
        var e = (t ? /^-?[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g : /^[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g).exec(this);
        if (!this || !e) return console.error("The size: " + this + " is illegal"), 0;
        var r = e[2], n = parseFloat(this), i = 0;
        return "rpx" === r ? i = Math.round(n * o) : "px" === r && (i = n), i;
    };
}

var r = t(require("./lib/pen")), n = t(require("./lib/downloader")), i = require("./lib/util"), a = new n.default();

Component({
    canvasWidthInPx: 0,
    canvasHeightInPx: 0,
    paintCount: 0,
    properties: {
        customStyle: {
            type: String
        },
        palette: {
            type: Object,
            observer: function(t, e) {
                this.isNeedRefresh(t, e) && (this.paintCount = 0, this.startPaint());
            }
        },
        dirty: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        picURL: "",
        showCanvas: !0,
        painterStyle: ""
    },
    attached: function() {
        e();
    },
    methods: {
        isEmpty: function(t) {
            for (var e in t) return !1;
            return !0;
        },
        isNeedRefresh: function(t, e) {
            return !(!t || this.isEmpty(t) || this.data.dirty && i.equal(t, e));
        },
        startPaint: function() {
            var a = this;
            if (!this.isEmpty(this.properties.palette)) {
                var e = this;
                if (!getApp().systemInfo || !getApp().systemInfo.screenWidth) try {
                    getApp().systemInfo = wx.getSystemInfoSync();
                } catch (a) {
                    var t = "Painter get system info failed, " + JSON.stringify(a);
                    return e.triggerEvent("imgErr", {
                        error: t
                    }), void console.error(t);
                }
                o = getApp().systemInfo.screenWidth / 750, this.downloadImages().then(function(t) {
                    var e = t.width, n = t.height;
                    if (a.canvasWidthInPx = e.toPx(), a.canvasHeightInPx = n.toPx(), e && n) {
                        a.setData({
                            painterStyle: "width:" + e + ";height:" + n + ";"
                        });
                        var i = wx.createCanvasContext("k-canvas", a);
                        new r.default(i, t).paint(function() {
                            a.saveImgToLocal();
                        });
                    } else console.error("You should set width and height correctly for painter, width: " + e + ", height: " + n);
                }).catch(function(t) {
                    e.triggerEvent("imgErr", {
                        error: t
                    });
                });
            }
        },
        downloadImages: function() {
            var h = this;
            return new Promise(function(e, n) {
                var i = 0, o = 0, s = JSON.parse(JSON.stringify(h.properties.palette));
                if (s.background && (i++, a.download(s.background).then(function(t) {
                    s.background = t, i === ++o && e(s);
                }, function() {
                    i === ++o && e(s);
                })), s.views) {
                    var t = !0, r = !1, c = void 0;
                    try {
                        for (var u, f = s.views[Symbol.iterator](); !(t = (u = f.next()).done); t = !0) !function() {
                            var r = u.value;
                            r && "image" === r.type && r.url && (i++, a.download(r.url).then(function(t) {
                                r.url = t, wx.getImageInfo({
                                    src: r.url,
                                    success: function(t) {
                                        r.sWidth = t.width, r.sHeight = t.height;
                                    },
                                    fail: function(t) {
                                        var e = "getImageInfo failed, " + JSON.stringify(t || {}) + "; imageUrl:" + r.url;
                                        console.error(e), n(e);
                                    },
                                    complete: function() {
                                        i === ++o && e(s);
                                    }
                                });
                            }, function() {
                                i === ++o && e(s);
                            }));
                        }();
                    } catch (t) {
                        r = !0, c = t;
                    } finally {
                        try {
                            !t && f.return && f.return();
                        } finally {
                            if (r) throw c;
                        }
                    }
                }
                0 === i && e(s);
            });
        },
        saveImgToLocal: function() {
            var t = this, e = this;
            setTimeout(function() {
                wx.canvasToTempFilePath({
                    canvasId: "k-canvas",
                    success: function(t) {
                        e.getImageInfo(t.tempFilePath);
                    },
                    fail: function(t) {
                        console.error("canvasToTempFilePath failed, " + JSON.stringify(t)), e.triggerEvent("imgErr", {
                            error: t
                        });
                    }
                }, t);
            }, 300);
        },
        getImageInfo: function(r) {
            var n = this;
            wx.getImageInfo({
                src: r,
                success: function(t) {
                    if (5 < n.paintCount) {
                        var e = "The result is always fault, even we tried 5 times";
                        return console.error(e), void n.triggerEvent("imgErr", {
                            error: e
                        });
                    }
                    Math.abs((t.width * n.canvasHeightInPx - n.canvasWidthInPx * t.height) / (t.height * n.canvasHeightInPx)) < .01 ? n.triggerEvent("imgOK", {
                        path: r
                    }) : n.startPaint(), n.paintCount++;
                },
                fail: function(t) {
                    console.error("getImageInfo failed, " + JSON.stringify(t)), n.triggerEvent("imgErr", {
                        error: t
                    });
                }
            });
        }
    }
});

var o = .5;