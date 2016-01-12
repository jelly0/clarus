"use strict";

/**
 * The domain.repository manages holds the context of the current work item.
 */

angular.module("repository", ["dal"]).service("repository", ["$log", "$rootScope", "$q", "$state", "authService",
    function ($log, $rootScope, $q, $state, authService) {
        var registry = {};

        this.register = function (repositoryName, repository) {
            if (registry.hasOwnProperty(repositoryName)) {
                $log.error("ERROR: Cannot register " + repositoryName + "becuase a repository has already been registered with the same name");
                throw repositoryName + " has already been registered";
            } else {
                registry[repositoryName] = repository;
                $log.debug(repositoryName + " has been successfully added to $$repository");
            }
        };

        this.getRepository = function (repositoryName) {
            return registry[repositoryName];
        };

        this.clearContext = function () {
            _.forEach(registry, function (n, key) {
                registry[key].clearContext();
            });
        };

        $log.debug("Repository: Instantiated");
    }]);
