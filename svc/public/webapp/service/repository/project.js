"use strict";

angular.module("repository").run(["repository", "$q", "$log", "dal", "userContext",
    function ProjectRepo(repository, $q, $log, dal, userContext) {

        // TODO map user - not needed at the moment as there is only ONE user
        var projectCache = [];
        var projectDao = dal.getDao($$dal.PROJECT);

        repository.register($$repository.PROJECT,
            {
                getProjectById: function (projectId) {
                    return _.find(projectCache, function (project) {
                        return project.id == projectId;
                    });
                },
                getUserProjects: function (userId) {
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
                },
                saveProject: function (projectToSave) {
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
                },
                deleteProject: function (projectToDelete) {
                    var deferred = $q.defer();

                    projectDao.deleteProject(projectToDelete).then(function () {
                        _.remove(projectCache, {id: projectToDelete.id});
                        deferred.resolve(projectCache);
                    }, function (error) {
                        deferred.reject(error);
                    });

                    return deferred.promise;
                }
                ,
                clearContext: function () {
                    projectCache = [];
                }
            }
        );

        $log.debug("Repository:ProjectREPO Instantiated");
    }]);
