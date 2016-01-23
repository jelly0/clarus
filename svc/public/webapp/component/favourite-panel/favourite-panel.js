"use strict";

angular.module("clarus").directive("favouritePanel", function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "component/favourite-panel/favourite-panel.html"
    };
});
