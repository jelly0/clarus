angular.module("clarus").config(function ($stateProvider) {
    $stateProvider.state("user.project.meeting", {
        url: "/meeting",
        views: {
            "content@user.project": {
                templateUrl: "feature/user/project/meeting/u04005-meeting.html"
            }
        }
    }).state("user.project.meeting.edit", {
        url: "/:meetingId",
        views: {
            "content@user.project": {
                templateUrl: "feature/user/project/meeting/u04010-meeting-form.html"
            }
        }
    })
});
