"use strict";

angular.module("clarus").controller("u03000ProjectHomeCtrl", ["$state", "$stateParams", "$log", "projectContext",
    function ($state, $stateParams, $log, projectContext) {
        var vm = this;

        (function init() {
            projectContext.setCurrentProject($stateParams.projectId);
        })();

        vm.isAtDashboard = function() {
            return $state.is("user.project.dashboard");
        };

        vm.navigateToDashboard = function() {
            $state.go("user.project.dashboard");
        };

        vm.isAtMeetings = function() {
            return $state.includes("user.project.meeting");
        };

        vm.navigateToMeetings = function() {
            $state.go("user.project.meeting");
        };
    }]);
