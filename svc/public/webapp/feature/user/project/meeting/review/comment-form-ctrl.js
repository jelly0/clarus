"use strict";

angular.module("clarus").controller("commentFormCtrl", ["$scope", "$uibModalInstance", "$log", "params",
    function ($scope, $uibModalInstance, $log, params) {
        var vm = $scope;

        (function init() {
            vm.isReply = params.isReply;
            vm.comment = {};

            if (params.comment != undefined) {
                vm.comment.reference = params.comment.reference;
                vm.comment.text = params.comment.text;
            }
        })();

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        vm.save = function (commentForm) {
            if (commentForm.$valid) {
                $uibModalInstance.close(vm.comment);
            }
        };
    }]);

