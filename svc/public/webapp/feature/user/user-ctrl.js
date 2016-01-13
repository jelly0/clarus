angular.module("clarus").controller("userCtrl", ["$rootScope", "$state", "$log", "$scope", "userContext",
    function ($rootScope, $state, $log, $scope, userContext) {
        var vm = $scope;

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

        vm.isAtHome = function () {
            return $state.is("user.home");
        };

        vm.isAtProjects = function () {
            return $state.is("user.project");
        };

        vm.isAtMeetings = function () {
            return $state.includes("user.project.meeting");
        };

        vm.navigateToProjects = function () {
            $state.go("user.project");
        };

        vm.navigateToMeetings = function () {
            if (userContext.getSelectedProject()) {
                $state.go("user.project.meeting", {projectId: userContext.getSelectedProject().id});
            }
        };

        vm.getSelectedProject = function () {
            return userContext.getSelectedProject();
        };

        vm.hasSelectedProject = function () {
            return userContext.getSelectedProject() != undefined;
        };
    }]);
