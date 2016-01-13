angular.module("clarus").config(function ($stateProvider) {
    $stateProvider.state("user.project", {
        url: "/user/project",
        views: {
            "feature@user": {
                templateUrl: "feature/user/project/project.html"
            },
            "sidebar-menu@user": {
                templateUrl: "feature/user/project/project-menu.html"
            }
        }
    }).state("user.project.edit", {
        url: "/:projectId",
        views: {
            "feature@user": {
                templateUrl: "feature/user/project/project-form.html"
            }
        }
    }).state("user.project.meeting", {
        url: "/:projectId/meeting",
        views: {
            "feature@user": {
                templateUrl: "feature/user/project/meeting/meeting.html"
            }
        }
    }).state("user.project.meeting.edit", {
        url: "/:meetingId",
        views: {
            "feature@user": {
                templateUrl: "feature/user/project/meeting/meeting-form.html"
            }
        }
    })
});
