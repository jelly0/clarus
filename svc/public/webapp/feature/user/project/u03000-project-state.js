angular.module("clarus").config(function ($stateProvider) {
    $stateProvider.state("user.project", {
        abstract: true,
        url: "/project/:projectId",
        views: {
            "feature@user": {
                templateUrl: "feature/user/project/u03000-project-home.html"
            },
            "sidebar-menu@user": {
                templateUrl: "feature/user/project/u03010-project-menu.html"
            }
        }
    }).state("user.project.dashboard", {
        url: "/dashboard",
        views: {
            "content@user.project": {
                templateUrl: "feature/user/project/u03005-project-dashboard.html"
            }
        }
    })
});
