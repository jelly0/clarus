"use strict";

angular.module("clarus").controller("u03020ProjectsCtrl", ["$log", "$state", "projectRepository", "userContext",
    function ($log, $state, projectRepository, userContext) {
        var vm = this;
        (function init() {
            vm.waiting = true;
            projectRepository.getUserProjects().then(function (results) {
                vm.waiting = false;
                vm.projects = results;
            }, function (error) {
                vm.waiting = false;
                $$dialog.error(" We've encountered a problem while loading your projects.  Please try again later");
                $log.error("projectCtrl - cannot load project because of " + error.message);
            });
        })();

        vm.projects = [];

        vm.isFavourite = function (project) {
            return userContext.isFavouriteProject(project);
        };

        vm.toggleFavourite = function (project) {
            if (userContext.isFavouriteProject(project)) {
                userContext.removeFavourite(project);
            } else {
                userContext.addFavourite(project);
            }
        };

        vm.manageProject = function(project) {
            $state.go("user.project.dashboard", {projectId: project.id});
        };

        vm.isWaiting = function() {
            return waiting;
        };
    }]);

