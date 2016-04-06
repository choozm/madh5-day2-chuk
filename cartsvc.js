var CartService = angular.module("CartService", []);

var CartSvc = function() {
    var items = [];
    this.saveItem = function(i) {
        items.push(i);
    }
    this.getItems = function(fn) {
        if (fn)
            return (items.filter(fn));
        return (items);
    }
};

CartService.service("CartSvc", [CartSvc]);