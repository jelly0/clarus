"use strict";

angular.module('app').config(function ($stateProvider) {
    var $log = angular.injector(['ng']).get('$log');
    $stateProvider.state("error", {
        url: "/error",
        views: {
            "root-content@": {
                templateUrl: "feature/common/error/error.html"
            }
        }
    });
    $log.debug("Error states configured");
});
