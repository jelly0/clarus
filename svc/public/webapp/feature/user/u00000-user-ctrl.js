angular.module("clarus").controller("u00000UserCtrl", ["$rootScope", "$state", "$log", "userContext",
    function ($rootScope, $state, $log, userContext) {
        var vm = this;

        (function init() {
            vm.aboutVisible = false;
            vm.user = userContext.getUser();
        })();

        vm.logout = function () {
            $$dialog.confirm("Are you sure that you want to logout?", "Logout", function () {
                userContext.logout();
                $state.go("user.login");
            });
        };

        vm.showAbout = function () {
            vm.aboutVisible = true;
        };

        vm.hideAbout = function () {
            vm.aboutVisible = false;
        };

        vm.navigateToDashboard = function() {
            $state.go("user.home.dashboard");
        };
    }]);
