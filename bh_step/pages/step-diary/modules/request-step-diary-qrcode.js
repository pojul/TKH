function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = e(require("./../../../utils/share/request-qrcode.js")), t = e(require("./../../../utils/share/scene-util.js")), u = e(require("./../../../utils/share-type.js"));

exports.default = function() {
    var e = t.default.creatQrShareScene({
        t: u.default.SHARE_TYPE_STEP_DIARY_WITH_IMG
    });
    return (0, r.default)("", e);
};