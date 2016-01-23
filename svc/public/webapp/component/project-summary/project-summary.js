"use strict";

angular.module("clarus").directive("projectSummary", [function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "component/project-summary/project-summary.html",
        controller: "projectSummaryCtrl",
        controllerAs: 'vm',
        scope: {},
        bindToController : {
            project: "="
        }
    };
}]);
