"use strict";

angular.module("clarus").controller("projectCtrl", ["$log", "$state", "projectRepository", "userContext",
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
            })
        })();

        vm.projects = [];

        vm.setAsSelected = function (project) {
            userContext.setSelectedProject(project);
        };

        vm.isSelected = function (project) {
            var selectedProject = userContext.getSelectedProject();
            return (selectedProject != null && selectedProject != undefined && selectedProject.id == project.id);
        };

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

        vm.edit = function (project) {
            $state.go("user.project.edit", {projectId: project.id});
        };

        vm.isWaiting = function() {
            return waiting;
        };
    }]);

