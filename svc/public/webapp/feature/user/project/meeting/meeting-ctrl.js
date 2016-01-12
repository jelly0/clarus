"use strict";

angular.module('app').controller("meetingCtrl", ["$log", "$scope", "$state", "$stateParams", "repository", "userContext",
    function ($log, $scope, $state, $stateParams, repository, userContext) {
        var vm = $scope;

        (function init() {
            vm.waiting = true;
            vm.meetings = [];
            repository.getRepository($$repository.MEETING).getProjectMeetings($stateParams.projectId).then(
                function (results) {
                    vm.meetings = results;
                    vm.waiting = false;
                }, function (error) {
                    $log.error("meetingCtrl - cannot load meeting because of " + error.message);
                    vm.waiting = false;
                    $$dialog.error(" We've encountered a problem while loading your meetings.  Please try again later");
                })
        })();

        vm.edit = function (meeting) {
            $state.go("user.project.meeting.edit", {projectId: meeting.projectId, meetingId: meeting.id});
        };

        vm.review = function (meeting) {
            $state.go("user.project.meeting.review", {meetingId: meeting.id});
        };
    }]);

