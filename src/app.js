define({
    name: "app",
    extend: "spamjs.view",
    modules: ["jqrouter", "jQuery"]
}).as(function (app, jqrouter, jQuery) {

    return {
        router: jqrouter.map({
            "/iapp/boot/*": "openDevSection",
            "/iapp/boot/{mod}/*": "openDevSection",
            "/iapp/list": "list"
        }),
        events: {},
        _init_: function () {
            var self = this;
            jqrouter.start();
            _importStyle_("iapp/style");
            if (document.location.pathname.startsWith("/iapp/boot")) {
                this.openDevSection();
            } else {
                this.$$.loadTemplate(
                    this.path("app.html")).done(function () {
                    self.router();
                    jQuery('body').removeClass("loadingPage");
                });
            }
        },
        list: function () {
            var self = this;
            module("cart", function (CART) {
                self.add(CART.instance({
                    id: "product_cart",
                    options: {}
                }));
            });
            module("productlist", function (LIST) {
                self.add(LIST.instance({
                    id: "main_module",
                    options: {}
                }));
            })
        },
        openDevSection: function () {
            var self = this;
            module("spamjs.bootconfig", function (myModule) {
                self.add(myModule.instance({
                    id: "bootconfig",
                    routerBase: "/olp/boot/"
                }));
            });
        },
        _routerEvents_: function (e, target, data, params) {
            console.error("_routerEvents_", e, target, data, params);
        },
        _ready_: function () {
            var ERROR = window.console.error;
            window.onerror = function () {
                ERROR.apply(window.console, arguments);
            };
            if (window.console && !bootloader.config().debug) {
                window.console.error = function () {
                    return window.console.warn.apply(window.console, arguments);
                };
            }
            window.GLOBAL = {
                olpApp: this.instance()
            };
            window.GLOBAL.olpApp.addTo(jQuery("body"));
        }
    };

});
