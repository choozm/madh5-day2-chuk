var CustomerApp = angular.module("CustomerApp", []);

var CustomerService = function($http, $q) {
    return ({
        queryCustomer: function(cid) {
            var _getFromCache = function(cid) {
                var result = localStorage.getItem(cid);
                if (result)
                    return (JSON.parse(result));
                return (null);
            };
            var _saveToCache = function(customer) {
                localStorage.setItem(customer.customerId, JSON.stringify(customer));
            };
                
            var result = _getFromCache(cid);
            if (result) {
                console.info("--> result from cache: " + cid)
                return ($q.resolve(result));
            }
            
            var defer = $q.defer();
            $http.get("http://localhost:10633/customer/api/customer/" + cid)
                .then(function(result) {
                    _saveToCache(result.data);
                    defer.resolve(result.data);
                }).catch(function() {
                    defer.reject("Customer " + cid + " not found");
                });
            return (defer.promise);
        }
    });
};

var CustomerCtrl = function($scope, CustomerSvc) {
    $scope.queryId = 0;
    $scope.customer = {};
    $scope.queryCustomer = function() {
        $scope.status = "";
        CustomerSvc.queryCustomer($scope.queryId)
            .then(function(customer) {
                $scope.customer = customer;
            }).catch(function(msg) {
                $scope.status = msg;
                $scope.customer = {};
            });
    }
}

CustomerApp.factory("CustomerSvc", ["$http", "$q", CustomerService]);

CustomerApp.controller("CustomerCtrl",
        ["$scope", "CustomerSvc", CustomerCtrl])










