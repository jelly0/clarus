angular.module('app').config(function ($stateProvider) {
    $stateProvider.state("user.project.meeting.review", {
        url: "/:meetingId/review",
        views: {
            "feature@user": {
                templateUrl: "feature/user/project/meeting/review/review.html"
            }
        }
    })
});