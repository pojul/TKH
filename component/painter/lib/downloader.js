var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(a) {
    return new Promise(function(r, f) {
        wx.downloadFile({
            url: a,
            success: function(t) {
                if (200 !== t.statusCode) return console.error("downloadFile " + a + " failed res.statusCode is not 200"), 
                void f();
                var i = t.tempFilePath;
                wx.getFileInfo({
                    filePath: i,
                    success: function(e) {
                        var t = e.size;
                        o(t).then(function() {
                            n(a, t, i).then(function(e) {
                                r(e);
                            });
                        }, function() {
                            r(i);
                        });
                    },
                    fail: function(e) {
                        console.error("getFileInfo " + t.tempFilePath + " failed, " + JSON.stringify(e)), 
                        r(t.tempFilePath);
                    }
                });
            },
            fail: function(e) {
                console.error("downloadFile failed, " + JSON.stringify(e) + " "), f();
            }
        });
    });
}

function n(o, r, t) {
    return new Promise(function(n, e) {
        wx.saveFile({
            tempFilePath: t,
            success: function(e) {
                var t = w[c] ? w[c] : 0;
                w[o] = {}, w[o][d] = e.savedFilePath, w[o][y] = new Date().getTime(), w[o][v] = r, 
                w.totalSize = r + t, wx.setStorage({
                    key: s,
                    data: w
                }), n(e.savedFilePath);
            },
            fail: function(e) {
                console.error("saveFile " + o + " failed, then we delete all files, " + JSON.stringify(e)), 
                n(t), i();
            }
        });
    });
}

function i() {
    wx.removeStorage({
        key: s,
        success: function() {
            wx.getSavedFileList({
                success: function(e) {
                    r(e.fileList);
                },
                fail: function(e) {
                    console.error("getSavedFileList failed, " + JSON.stringify(e));
                }
            });
        }
    });
}

function o(g) {
    return new Promise(function(e, t) {
        var n = w[c] ? w[c] : 0;
        if (g + n <= S) e(); else {
            var o = [], i = JSON.parse(JSON.stringify(w));
            delete i[c];
            var f = Object.keys(i).sort(function(e, t) {
                return i[e][y] - i[t][y];
            }), a = !0, l = !1, u = void 0;
            try {
                for (var v, m = f[Symbol.iterator](); !(a = (v = m.next()).done); a = !0) {
                    var p = v.value;
                    if (n -= w[p].size, o.push(w[p][d]), delete w[p], n + g < S) break;
                }
            } catch (e) {
                l = !0, u = e;
            } finally {
                try {
                    !a && m.return && m.return();
                } finally {
                    if (l) throw u;
                }
            }
            w.totalSize = n, wx.setStorage({
                key: s,
                data: w,
                success: function() {
                    0 < o.length && r(o), e();
                },
                fail: function(e) {
                    console.error("doLru setStorage failed, " + JSON.stringify(e)), t();
                }
            });
        }
    });
}

function r(e) {
    var t = !0, n = !1, o = void 0;
    try {
        for (var i, r = e[Symbol.iterator](); !(t = (i = r.next()).done); t = !0) !function() {
            var t = i.value, e = t;
            "object" === (void 0 === t ? "undefined" : f(t)) && (e = t.filePath), wx.removeSavedFile({
                filePath: e,
                fail: function(e) {
                    console.error("removeSavedFile " + t + " failed, " + JSON.stringify(e));
                }
            });
        }();
    } catch (e) {
        n = !0, o = e;
    } finally {
        try {
            !t && r.return && r.return();
        } finally {
            if (n) throw o;
        }
    }
}

function a(e) {
    if (w[e]) return w[e].time = new Date().getTime(), wx.setStorage({
        key: s,
        data: w
    }), w[e];
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var f = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : _typeof(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : _typeof(e);
}, l = function() {
    function o(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(e, t, n) {
        return t && o(e.prototype, t), n && o(e, n), e;
    };
}(), u = require("./util"), s = "savedFiles", c = "totalSize", d = "path", y = "time", v = "size", S = 6291456, w = {}, g = function() {
    function n() {
        e(this, n), getApp().PAINTER_MAX_LRU_SPACE && (S = getApp().PAINTER_MAX_LRU_SPACE), 
        wx.getStorage({
            key: s,
            success: function(e) {
                e.data && (w = e.data);
            }
        });
    }
    return l(n, [ {
        key: "download",
        value: function(r) {
            return new Promise(function(n, o) {
                if (r && u.isValidUrl(r)) {
                    var i = a(r);
                    i ? wx.getSavedFileInfo({
                        filePath: i[d],
                        success: function(e) {
                            n(i[d]);
                        },
                        fail: function(e) {
                            console.error("the file is broken, redownload it, " + JSON.stringify(e)), t(r).then(function(e) {
                                n(e);
                            }, function() {
                                o();
                            });
                        }
                    }) : t(r).then(function(e) {
                        n(e);
                    }, function() {
                        o();
                    });
                } else n(r);
            });
        }
    } ]), n;
}();

exports.default = g;