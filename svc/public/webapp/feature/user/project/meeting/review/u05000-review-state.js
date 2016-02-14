angular.module("clarus").config(function ($stateProvider) {
    $stateProvider.state("user.project.meeting.review", {
        url: "/:meetingId/review",
        views: {
            "content@user.project": {
                templateUrl: "feature/user/project/meeting/review/u05010-review.html"
            }
        }
    })
});
