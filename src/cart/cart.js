define({
    name: "cart",
    extend: "spamjs.view",
    modules: ["jQuery"]
}).as(function (LIST, jq) {

    var MYCART = [];

    return {
        evetns : {
            ".prodcut_buy" : "prodcut_buy"
        },
        _init_: function () {
            var self =  this;
            return this.$$.loadTemplate(
                this.path("cart.html"),
                {
                    products: MYCART
                }
            ).done(function(){
                self.model({ products : MYCART } );
            });
        },
        addProduct : function(product){
            console.warn("prodict",product);
            MYCART.push(product);
        }
    }
})
;
