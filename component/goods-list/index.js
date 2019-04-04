Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        goods: {
            type: Array
        },
        middle_bannerList: {
            type: Array
        },
        from: {
            type: String
        }
    },
    data: {
        goods: [],
        adlist: {},
        from: ""
    },
    ready: function() {
        var t = this.data.middle_bannerList, e = t && 0 < t.length ? t[0] : null, a = e && "{}" != e.action ? JSON.parse(e.action) : null;
        this.setData({
            goods: this.data.goods,
            adlist: a,
            from: this.data.from
        });
    },
    methods: {
        navigateTo: function(e) {
            var a = e.currentTarget.dataset.id, r = e.currentTarget.dataset.oem_type, s = e.currentTarget.dataset.oem_id;
            console.log(this.data.oem_type);
            var n = e.currentTarget.dataset.goodsdata;
            n && 10 == n.goods_type ? this.triggerEvent("goodsInviteItemClick", {
                data: e.currentTarget.dataset
            }) : t.goodsDetail(a, r, s, this.data.from, "", 0);
        },
        TapAdBanner: function(a) {
            var r = a.currentTarget.dataset.adtype, s = a.currentTarget.dataset.jump_url;
            a.currentTarget.dataset.click_url ? (this.ADcallback(a.currentTarget.dataset.click_url[0], a.currentTarget.dataset.scclick_url[0]), 
            e.sensors.track("XMClick", {
                ck_module: "banner点击",
                contentid: a.currentTarget.dataset.title || "",
                page: "首页"
            })) : e.sensors.track("XMClick", {
                ck_module: "banner点击",
                contentid: a.currentTarget.dataset.jump_url || "",
                page: "首页"
            }), t.ADroute(r, s);
        },
        ADcallback: function(t, a) {
            wx.request({
                url: t
            }), wx.request({
                url: a,
                data: {
                    data: {
                        phead: phead,
                        distinct_id: e.sensors.store.getDistinctId(),
                        properties: {
                            app_title: "365步步赚",
                            $title: "365步步赚",
                            url: "page/index/index"
                        }
                    },
                    handle: 0,
                    shandle: 0
                }
            });
        }
    }
});