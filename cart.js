var CartApp = angular.module("CartApp", ["CartService"]);

var CartCtrl = function($scope, CartSvc) {
    $scope.item = "";
    $scope.items = [];
    $scope.add = function() {
        CartSvc.saveItem($scope.item);
        $scope.item = "";
        $scope.items = CartSvc.getItems();
    }
}
CartApp.controller("CartCtrl", ["$scope", "CartSvc", CartCtrl]);