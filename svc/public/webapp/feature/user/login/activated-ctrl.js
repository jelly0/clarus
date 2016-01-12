"use strict";

angular.module("app").controller("activatedCtrl", ["$state", "$log",
    function ($state, $log) {
        var vm = this;

        vm.login = function () {
            $state.go("user.login");
        };
    }]);
