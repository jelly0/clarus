"use strict";
angular.module("clarus").service("projectContext", ["$log", "$rootScope", "$q", "$state", "contextEvent", "projectRepository",
    function ($log, $rootScope, $q, $state, contextEvent, projectRepository) {
        var currentProject = null;

        (function init() {
            $rootScope.$on(contextEvent.CLEAR_CONTEXT, function clearContext() {
                currentProject = null;
                $log.debug("projectContext: context cleared");
            })
        })();

        this.setCurrentProject = function(projectId) {
            currentProject = projectRepository.getProjectById(projectId);
        };

        this.getCurrentProject = function() {
            return currentProject;
        };

        $log.debug("projectContext: Instantiated");
    }]);
