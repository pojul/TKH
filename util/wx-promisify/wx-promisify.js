Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(u) {
    return function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        return new Promise(function(n, t) {
            e.success = function(e) {
                n(e);
            }, e.fail = function(e) {
                t(e);
            }, u(e);
        });
    };
};