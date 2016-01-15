"use strict";

angular.module("clarus").service("meetingRepository", ["$q", "$log", "$rootScope", "contextEvent", "meetingDao",
    function ($q, $log, $rootScope, contextEvent, meetingDao) {
        var meetingCache = {};

        (function init() {
            $rootScope.$on(contextEvent.CLEAR_CONTEXT, function clearContext() {
                meetingCache = {};
                $log.debug("meetingRepository: context cleared");
            })
        })();

        this.getMeetingById = function (projectId, meetingId) {
            // User will only have the meeting ID if it is already loaded
            return _.find(meetingCache[projectId], function (meeting) {
                return meeting.id == meetingId;
            });
        };

        this.getProjectMeetings = function (projectId) {
            var deferred = $q.defer();
            if (meetingCache.hasOwnProperty(projectId)) {
                deferred.resolve(meetingCache[projectId]);
            } else {
                meetingDao.getProjectMeetings(projectId).then(
                    function (results) {
                        for (var i = 0; i < results.length; i++) {
                            results[i].scheduledDate = new Date(results[i].scheduledDate);
                            results[i].reviewByDate = new Date(results[i].reviewByDate);
                        }
                        meetingCache[projectId] = results;
                        deferred.resolve(results);
                    }, function (error) {
                        deferred.reject(error);
                    });
            }
            return deferred.promise;
        };

        this.saveMeeting = function (meetingToSave) {
            var deferred = $q.defer();
            if (meetingToSave.hasOwnProperty("id")) {
                meetingDao.updateMeeting(meetingToSave).then(
                    function success() {
                        _.remove(meetingCache[meetingToSave.projectId], function (meeting) {
                            return meeting.id == meetingToSave.id;
                        });
                        meetingCache[meetingToSave.projectId].push(meetingToSave);
                        deferred.resolve(meetingToSave);
                    }, function error(error) {
                        deferred.reject(error);
                    });
            } else {
                meetingDao.saveMeeting(meetingToSave).then(
                    function success(savedMeeting) {
                        if (!meetingCache.hasOwnProperty(meetingToSave.projectId)) {
                            meetingCache[meetingToSave.projectId] = [];
                        }
                        meetingCache[meetingToSave.projectId].push(savedMeeting);
                        deferred.resolve(savedMeeting);
                    }, function error(error) {
                        deferred.reject(error);
                    });
            }
            return deferred.promise;
        };

        $log.debug("repository:meetingRepository Instantiated");
    }]);
