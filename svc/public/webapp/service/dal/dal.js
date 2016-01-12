"use strict";

angular.module("dal", []).service("dal", ["$http", "$q", "$log", function ($http, $q, $log) {
    var registry = {};

    /**
     * Register a DAO with the DAL.  The DAO canbe access via dal.getDAO() by the application
     * @param daoName A Unique name for the DAO
     * @param dao
     */
    this.register = function (daoName, dao) {

        if (registry.hasOwnProperty(daoName)) {
            $log.error("ERROR: Cannot register " + daoName + "because a DAO has already been registered with the same name");
            throw daoName + " has already been registered";
        }
        else {
            registry[daoName] = dao;
            $log.debug(daoName + " has been successfully added to $$dal");
        }
    };

    /**
     *
     * @param daoName
     * @returns {*}
     */
    this.getDao = function (daoName) {
        return registry[daoName];
    };

    this.http = (function serviceCaller() {
        return {
            /**
             * @returns {promise}
             */
            GET: function (apiPath) {
                var deferred = $q.defer();
                $http.get(apiPath).then(function (result) {
                    deferred.resolve(result.data);
                }, function (e) {
                    deferred.reject(e);
                });
                return deferred.promise;
            },

            /**
             * @returns {promise}
             */
            POST: function (apiPath, itemToSave) {
                var deferred = $q.defer();
                $http(
                    {
                        method: "post",
                        url: apiPath,
                        headers: {
                            "Accept": "application/json, text/plain, */*",
                            "Content-Type": "application/json;charset=UTF-8"
                        },
                        data: JSON.stringify(itemToSave)
                    }
                ).then(function (results) {
                    deferred.resolve(results.data);
                }, function (e) {
                    deferred.reject(e);
                });
                return deferred.promise;
            },
            /**
             * @returns {promise}
             */
            PUT: function (apiPath, itemToSave) {
                var deferred = $q.defer();
                $http(
                    {
                        method: "put",
                        url: apiPath,
                        headers: {
                            "Accept": "application/json, text/plain, */*",
                            "Content-Type": "application/json;charset=UTF-8"
                        },
                        data: JSON.stringify(itemToSave)
                    }
                ).then(function (results) {
                    deferred.resolve(results);
                }, function (e) {
                    deferred.reject(e);
                });
                return deferred.promise;
            },
            /**
             * @returns {promise}
             */
            DELETE: function (apiPath, itemToDelete) {
                var deferred = $q.defer();
                $http.delete(apiPath + itemToDelete.id).then(function () {
                    deferred.resolve();
                }, function (e) {
                    deferred.reject(e);
                });
                return deferred.promise;
            }
        }
    })();
    $log.debug("$$dal Instantiated");
}]);
