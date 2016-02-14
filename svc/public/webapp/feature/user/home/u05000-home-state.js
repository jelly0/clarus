angular.module("clarus").config(function ($stateProvider) {
    $stateProvider.state("user.home", {
        abstract: true,
        url: "/home",
        views: {
            "feature@user": {
                templateUrl: "feature/user/home/u05000-home.html"
            },
            "sidebar-menu@user": {
                templateUrl: "feature/user/home/u05010-home-menu.html"
            }
        }
    }).state("user.home.dashboard", {
        url: "/dashboard",
        views: {
            "content@user.home": {
                templateUrl: "feature/user/home/u05020-home-dashboard.html"
            }
        }
    }).state("user.home.project", {
        url: "/project",
        views: {
            "content@user.home": {
                templateUrl: "feature/user/project/u03020-project.html"
            }
        }
    })
});
