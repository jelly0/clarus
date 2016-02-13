"use strict";

angular.module("clarus").controller("attendeeFormCtrl", ["$scope", "$uibModalInstance", "$log",
    function ($scope, $uibModalInstance, $log) {
        var vm = $scope;

        (function init() {
            vm.attendee = {
                role: "REVIEW"
            };
        })();

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        vm.addAttendee = function (form) {
            if (form.$valid) {
                $uibModalInstance.close(vm.attendee);
            }
        };
    }]);

