var NewsApp = angular.module("NewsApp", []);

var NewsCtrl = function($scope) {
    var source = null;
    $scope.newsItem = {};
    $scope.start = function() {
        source = new EventSource("http://10.10.0.50:10633/topnews/api/news");
        source.onmessage = function(evt) {
            $scope.$apply(function() {
                console.info("> " + evt.data);
                $scope.newsItem.thumbnail = "";
                $scope.newsItem = JSON.parse(evt.data);
            });
        }
    }
    $scope.stop = function() {
        source.close();
        source = null;
    }
}

NewsApp.controller("NewsCtrl", ["$scope", NewsCtrl]);