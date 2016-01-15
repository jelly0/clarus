'use strict';
angular.module("clarus").service("authService", ["$log", "$http", "$q",
    function ($log, $http, $q) {
        var credentials = {};

        this.getUsername = function () {
            return credentials.username;
        };

        this.getRole = function () {
            return credentials.role;
        };

        this.getToken = function () {
            return credentials.token;
        };

        this.hasAuthenticated = function () {
            return !(credentials.token == undefined || credentials != null);
        };

        this.login = function (username, password) {
            var authData = btoa(username + ':' + password);
            var deferred = $q.defer();

            credentials.username = username;
            credentials.password = password;

            $http.get("login/user", {
                    headers: {"Authorization": "Basic " + authData}
                }
            ).then(function (successResponse) {
                    var user = successResponse.data;
                    credentials.token = successResponse.data.authToken;
                    deferred.resolve(user);
                }, function (error) {
                    deferred.reject(error);
                }
            );
            return deferred.promise;
        };

        this.logout = function() {
            credentials = {};
            $log.debug("authService: context cleared");
        }
    }]);
