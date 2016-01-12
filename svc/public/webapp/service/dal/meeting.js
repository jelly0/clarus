"use strict";

angular.module("dal").run(["dal", "$log", function (dal, $log) {

    dal.register($$dal.MEETING,
        {
            getProjectMeetings: function(projectId) {
                return dal.http.GET("project/" + projectId + "/meeting");
            },
            getUserMeetings: function(userId) {
                return dal.http.GET("user/" + userId + "/meeting");
            },
            saveMeeting : function (meetingToSave) {
                return dal.http.POST("meeting", meetingToSave);
            },
            updateMeeting : function (meetingToUpdate) {
                return dal.http.PUT("meeting", meetingToUpdate);
            },
            getMeetingComments: function(meetingId) {
                return dal.http.GET("meeting/" + meetingId + "/comment");
            },
            saveMeetingComments: function(meetingId, commentsToSave) {
                return dal.http.POST("meeting/" + meetingId + "/comment", commentsToSave);
            }
        });

    $log.debug("$$dal:ProjectDAO Instantiated");
}]);
