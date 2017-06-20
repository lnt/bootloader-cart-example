define({
    name: "productlist",
    extend: "spamjs.view",
    modules: ["jQuery", "cart"]
}).as(function (LIST, jq, cart) {

    var PRODUCTS = function (products) {
        for (var i = 0; i < 10; i++) {
            products.push({
                title: "Product " + (i + 1),
                description: "Product " + (i + 1) + "'s Descrition",
                price: 1 * 100
            })
        }
        return products;
    }([]);


    return {
        events : {
            "click .prodcut_buy" : "prodcut_buy"
        },
        _init_: function () {
            return this.$$.loadTemplate(
                this.path("productlist.html"),
                {
                    products: PRODUCTS
                }
            )
        },
        prodcut_buy : function(e, target,data){
            console.warn("prodict",data);
            cart.addProduct(PRODUCTS[data.id])

        }
    }
})
;
