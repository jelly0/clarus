"use strict";

angular.module("clarus").controller("u04000HomeCtrl", ["$state", "$log",
    function ($state, $log) {
        var vm = this;

        (function init() {
        })();

        vm.isAtHome = function() {
            return $state.is("user.home.dashboard");
        };
    }]);
