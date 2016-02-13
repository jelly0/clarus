angular.module("clarus").config(function ($stateProvider) {
    $stateProvider.state("user.home", {
        abstract: true,
        views: {
            "feature@user": {
                templateUrl: "feature/user/home/u04000-home.html"
            }
        }
    }).state("user.home.dashboard", {
        url: "/dashboard",
        views: {
            "content@user.home": {
                templateUrl: "feature/user/home/u04020-home-dashboard.html"
            }
        }
    })
});
