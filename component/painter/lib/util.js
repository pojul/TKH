var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

function t(e, o) {
    if (e === o) return !0;
    if (e && o && "object" == (void 0 === e ? "undefined" : r(e)) && "object" == (void 0 === o ? "undefined" : r(o))) {
        var n, f, i, u = Array.isArray(e), y = Array.isArray(o);
        if (u && y) {
            if ((f = e.length) != o.length) return !1;
            for (n = f; 0 != n--; ) if (!t(e[n], o[n])) return !1;
            return !0;
        }
        if (u != y) return !1;
        var c = e instanceof Date, l = o instanceof Date;
        if (c != l) return !1;
        if (c && l) return e.getTime() == o.getTime();
        var a = e instanceof RegExp, p = o instanceof RegExp;
        if (a != p) return !1;
        if (a && p) return e.toString() == o.toString();
        var s = Object.keys(e);
        if ((f = s.length) !== Object.keys(o).length) return !1;
        for (n = f; 0 != n--; ) if (!Object.prototype.hasOwnProperty.call(o, s[n])) return !1;
        for (n = f; 0 != n--; ) if (!t(e[i = s[n]], o[i])) return !1;
        return !0;
    }
    return e != e && o != o;
}

var r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : _typeof(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : _typeof(t);
};

module.exports = {
    isValidUrl: function(t) {
        return /(ht|f)tp(s?):\/\/([^ \\/]*\.)+[^ \\/]*(:[0-9]+)?\/?/.test(t);
    },
    equal: t
};