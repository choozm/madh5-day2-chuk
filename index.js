var DPApp = angular.module("DPApp", []);

var DPCtrl = function($scope, $q) {
    
    //Service provider
    var defer = $q.defer();
    
    //Service consumer
    var promise = defer.promise;

    $scope.deferMessage = "";
    $scope.promiseMessage = "";
    
    $scope.resolveBtn = function() {
        defer.resolve($scope.deferMessage);
    };
    $scope.rejectBtn = function() {
        defer.reject($scope.deferMessage);
    };

    promise
        .then(function(msg) {
            $scope.promiseMessage = "RESOLVE: " + msg;
        })
        .catch(function(msg) {
            $scope.promiseMessage = "REJECT: " + msg;
        });

};

DPApp.controller("DPCtrl", ["$scope", "$q", DPCtrl])

