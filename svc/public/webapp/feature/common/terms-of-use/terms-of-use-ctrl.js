/**
 * Common page for T&C.  This page relies on the calling state to provide the calling state name so that it can use
 * it to navigate back.
 *
 * @param $stateParams.from Name of the state.  This is used for navigating back
 */

angular.module("app").controller("termsOfUseCtrl", ["$scope", "$state", "$stateParams", "$log",
    function ($scope, $state, $stateParams, $log) {
        var vm = $scope;

        (function init() {
            vm.termsAndConditionsHeading = $$refdata.TERMS_OF_USE.heading;
            vm.termsAndConditionsBody = $$refdata.TERMS_OF_USE.body;
        })();

        vm.back = function () {
            $state.go($state.current.data.baseState, {credentials: $stateParams.credentials});
        }
    }]);
