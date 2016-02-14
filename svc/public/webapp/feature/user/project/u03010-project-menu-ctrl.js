"use strict";

angular.module("clarus").controller("projectMenuCtrl", ["$log", "projectContext", "$state",
    function ($log, projectContext, $state) {
        var vm = this;

        vm.manageProjects = function () {
            $state.go("user.project");
        };

        vm.newRootProject = function () {
            $state.go("user.project.edit");
        };

        vm.scheduleMeeting = function (project) {
            $state.go("user.project.meeting.edit", {projectId: projectContext.getCurrentProject().id});
        };
    }]);
