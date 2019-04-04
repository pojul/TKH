Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e) {
    if (e) {
        var r = "";
        for (var t in e) {
            var o = e[t];
            o && (r += (t = t.replace(/([A-Z])/, "-$1").toLowerCase()) + ":" + o + ";");
        }
        return r;
    }
};