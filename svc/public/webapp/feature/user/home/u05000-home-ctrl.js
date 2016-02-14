"use strict";

angular.module("clarus").controller("u05000HomeCtrl", ["$state", "$log",
    function ($state, $log) {
        var vm = this;

        (function init() {
        })();

        vm.isAtDashboard = function() {
            return $state.is("user.home.dashboard");
        };

        vm.navigateToDashboard = function() {
            $state.go("user.home.dashboard");
        };

        vm.isAtProjects = function() {
            return $state.is("user.home.project");
        };

        vm.navigateToProjects = function() {
            $state.go("user.home.project");
        };
    }]);
