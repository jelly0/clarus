"use strict";

angular.module("clarus").config(function ($stateProvider) {
    var $log = angular.injector(['ng']).get('$log');
    $stateProvider.state("user.login", {
        url: "/login",
        views: {
            "root-content@": {
                templateUrl: "feature/user/login/u02100-login.html"
            }
        }
    }).state("user.activated", {
        url: "/activated",
        views: {
            "root-content@": {
                templateUrl: "feature/user/login/u02200-activated.html"
            }
        }
    });

    $log.debug("Login states configured");
});
