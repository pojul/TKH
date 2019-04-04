function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var s = e(require("./../../../utils/img-utils.js")), t = e(require("./css-To-styleStr.js")), r = [ {
    posterImg: "https://img.xmiles.cn/step-diary/bg_9_6_1.png",
    stepNumCss: {
        top: "283rpx",
        right: "70rpx",
        color: "#ffffff"
    },
    useNameCss: {
        color: "#ffffff"
    },
    dateCss: {
        color: "rgba(255,255,255,0.80)"
    },
    stepNumStyle: "",
    useNameStyle: "",
    dateStyle: ""
}, {
    posterImg: "https://img.xmiles.cn/step-diary/bg_9_6_2.png",
    stepNumCss: {
        top: "302rpx",
        left: "110rpx",
        color: "#ffffff"
    },
    useNameCss: {
        color: "#ffffff"
    },
    dateCss: {
        color: "rgba(255,255,255,0.80)"
    },
    stepNumStyle: "",
    useNameStyle: "",
    dateStyle: ""
}, {
    posterImg: "https://img.xmiles.cn/step-diary/bg_9_6_4.png",
    stepNumCss: {
        top: "283rpx",
        right: "70rpx",
        color: "#434343"
    },
    useNameCss: {
        color: "#ffffff"
    },
    dateCss: {
        color: "rgba(255,255,255,0.80)"
    }
}, {
    posterImg: "https://img.xmiles.cn/step-diary/bg_9_6_3.png",
    stepNumCss: {
        color: "#ffffff",
        left: "110rpx",
        top: "302rpx"
    },
    useNameCss: {
        color: "#ffffff"
    },
    dateCss: {
        color: "rgba(255,255,255,0.80)"
    }
}, {
    posterImg: "https://img.xmiles.cn/step-diary/bg_9_6_5.png",
    stepNumCss: {
        color: "#FF8E00",
        left: "106rpx",
        top: "296rpx"
    },
    useNameCss: {
        color: "#333333"
    },
    dateCss: {
        color: "rgba(51,51,51,0.80)"
    }
} ];

r.map(function(e) {
    e && (e.posterImg = s.default.getTinyImg(e.posterImg), e.stepNumStyle = (0, t.default)(e.stepNumCss), 
    e.useNameStyle = (0, t.default)(e.useNameCss), e.dateStyle = (0, t.default)(e.dateCss));
}), exports.default = r;