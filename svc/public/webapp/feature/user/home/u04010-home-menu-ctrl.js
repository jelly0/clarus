"use strict";

angular.module("clarus").controller("u04010HomeMenuCtrl", ["$log", "userContext", "$state",
    function ($log, userContext, $state) {
        var vm = this;

        vm.manageProjects = function () {
            $state.go("user.home.project");
        };

        vm.newRootProject = function () {
            $state.go("user.project.edit");
        };
    }]);
