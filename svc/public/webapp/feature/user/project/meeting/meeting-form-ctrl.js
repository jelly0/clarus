"use strict";
angular.module("clarus").controller("meetingFormCtrl", ["$scope", "$state", "$stateParams", "$log", "$uibModal", "meetingRepository", "userContext",
    function ($scope, $state, $stateParams, $log, $uibModal, meetingRepository, userContext) {
        var vm = this;
        var attendeesRemovedCount = 0;

        (function init() {
            if ($stateParams.hasOwnProperty("meetingId") && $stateParams.meetingId != "") {
                vm.headingText = "Amend Meeting";
                vm.meeting = _.cloneDeep(meetingRepository.getMeetingById($stateParams.projectId, $stateParams.meetingId));
            } else {
                vm.headingText = "Schedule New Meeting";
                vm.meeting = {
                    projectId: $stateParams.projectId,
                    ownerId: userContext.getUser().id,
                    status: "SCHEDULED",
                    attendees: []
                };
            }

            (function initDateOptions() {
                var defaultDate = new Date();

                // Set schedule and review date to at least one hour from now
                defaultDate.setMinutes(0);
                defaultDate.setTime(defaultDate.getTime() + 7200000);

                vm.dateOptions = {
                    options: {formatYear: 'yyyy', startingDay: 1},
                    minDate: new Date(),
                    maxDate: (new Date()).setDate(defaultDate.getDate() + 90) // max 90 days from now
                };

                vm.meeting.scheduledDate = defaultDate;
                vm.openScheduledSelector = function ($event) {
                    vm.scheduledOpened = true;
                };
                vm.scheduledOpened = false;

                vm.meeting.reviewByDate = defaultDate;
                vm.openReviewBySelector = function ($event) {
                    vm.reviewByOpened = true;
                };
                vm.reviewByOpened = false;
            })();
            $log.debug("meetingFormCtrl instantiated");
        })();

        vm.saveMeeting = function (meetingForm) {
            if (meetingForm.$valid) {
                var waitingDialog = $$dialog.waiting("Please wait - Creating Meeting");
                meetingRepository.saveMeeting(vm.meeting).then(
                    function success(meeting) {
                        waitingDialog.close();
                        $$dialog.success("Meeting Saved successfully",
                            function completed() {
                                userContext.returnToLastState();
                            });
                    }, function error(reason) {
                        waitingDialog.close();
                        $$dialog.error("Unable to save meeting due to system error");
                    });
            }
        };

        vm.cancel = userContext.returnToLastState;

        vm.addAttendee = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'feature/user/project/meeting/attendee-form.html',
                controller: 'attendeeFormCtrl',
                size: "xs",
                backdrop: 'static'
            });

            modalInstance.result.then(function result(newAttendee) {
                if (_.find(vm.meeting.attendees, function (member) {
                        return member.email == newAttendee.email
                    })) {
                    $$dialog.error(newAttendee.email + " has already been added to this meeting");
                } else {
                    newAttendee.sessionStatus = "NEW";
                    vm.meeting.attendees.push(newAttendee);
                }
            }, function closed() {
            });
        };

        vm.removeAttendee = function (attendeeToRemove) {
            $$dialog.confirm("Are you sure that you want to delete " + attendeeToRemove.email + "?", "Delete",
                function confirmed() {
                    if (attendeeToRemove.sessionStatus == "NEW") {
                        _.remove(vm.meeting.attendees, function (attendee) {
                            return attendee.email == attendeeToRemove.email;
                        });
                    } else {
                        attendeeToRemove.sessionStatus = "REMOVED";
                        attendeesRemovedCount++;
                    }
                    $scope.$apply();
                });
        };

        vm.hasAttendees = function () {
            if (vm.meeting.hasOwnProperty("id")) {
                return vm.meeting.attendees.length - attendeesRemovedCount > 1;
            } else {
                return vm.meeting.attendees.length - attendeesRemovedCount > 0;
            }
        };
    }]);
