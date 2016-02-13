angular.module("clarus").config(function ($stateProvider) {
    $stateProvider.state("user", {
        abstract: true,
        views: {
            "root-content@": {
                templateUrl: "feature/user/u00000-user.html"
            }
        }
    })
});
