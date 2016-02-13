"use strict";

angular.module("clarus").controller("activatedCtrl", ["$state", "$log",
    function ($state, $log) {
        var vm = this;

        vm.login = function () {
            $state.go("user.login");
        };
    }]);
