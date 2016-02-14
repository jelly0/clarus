"use strict";

angular.module("clarus").controller("favouritePanelCtrl", ["$scope", "$log", "userContext",
    function ($scope, $log, userContext) {
        var vm = this;

        vm.favouriteProjects = userContext.getFavouriteProjects();

        vm.removeFavourite = function (project) {
            $$dialog.confirm("Are you sure that you want to remove " + project.title + " from the favourite list?", "Remove",
                function () {
                    userContext.removeFavourite(project);
                    $scope.$apply();
                });
        };

        $log.info("favouritePanelCtrl: instantiated");
    }]);
