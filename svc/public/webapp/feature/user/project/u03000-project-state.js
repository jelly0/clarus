angular.module("clarus").config(function ($stateProvider) {
    $stateProvider.state("user.project", {
        url: "/user/project",
        views: {
            "feature@user": {
                templateUrl: "feature/user/project/u03020-project.html"
            },
            "sidebar-menu@user": {
                templateUrl: "feature/user/project/u03010-project-menu.html"
            }
        }
    }).state("user.project.edit", {
        url: "/:projectId",
        views: {
            "feature@user": {
                templateUrl: "feature/user/project/u03030-project-form.html"
            }
        }
    }).state("user.project.meeting", {
        url: "/:projectId/meeting",
        views: {
            "feature@user": {
                templateUrl: "feature/user/project/meeting/u04000-meeting.html"
            }
        }
    }).state("user.project.meeting.edit", {
        url: "/:meetingId",
        views: {
            "feature@user": {
                templateUrl: "feature/user/project/meeting/u04010-meeting-form.html"
            }
        }
    })
});
