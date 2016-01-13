"use strict";

angular.module("clarus").service("projectRepository", ["$q", "$log", "dal", "userContext", "projectDao",
    function ($q, $log, dal, userContext, projectDao) {

        var projectCache = [];

        this.getProjectById = function (projectId) {
            return _.find(projectCache, function (project) {
                return project.id == projectId;
            });
        };
        this.getUserProjects = function (userId) {
            var deferred = $q.defer();

            if (userId == undefined || userId == null) {
                var user = userContext.getUser();
                userId = user.id;
            }

            if (projectCache.length == 0) {
                projectDao.getUserProjects(userId).then(function (results) {
                    projectCache = results;
                    deferred.resolve(results);
                }, function (error) {
                    deferred.reject(error);
                });
            } else {
                deferred.resolve(projectCache);
            }
            return deferred.promise;
        };
        this.saveProject = function (projectToSave) {
            var deferred = $q.defer();

            if (projectToSave.hasOwnProperty("id")) {
                projectDao.updateProject(projectToSave).then(function () {
                    _.remove(projectCache, function (project) {
                        return project.id == projectToSave.id;
                    });
                    projectCache.push(projectToSave);
                    deferred.resolve(projectToSave);
                }, function (error) {
                    deferred.reject(error);
                });
            } else {
                projectDao.saveProject(projectToSave).then(function (savedProject) {
                    projectCache.push(savedProject);
                    deferred.resolve(savedProject);
                }, function (error) {
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        };

        this.deleteProject = function (projectToDelete) {
            var deferred = $q.defer();

            projectDao.deleteProject(projectToDelete).then(function () {
                _.remove(projectCache, {id: projectToDelete.id});
                deferred.resolve(projectCache);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        this.clearContext = function () {
            projectCache = [];
        };

        $log.debug("repository:projectRepository Instantiated");
    }]);
