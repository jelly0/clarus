"use strict";

angular.module("clarus").service("meetingDao", ["dal", "$log", function (dal, $log) {

    this.getProjectMeetings = function (projectId) {
        return dal.http.GET("project/" + projectId + "/meeting");
    };

    this.getUserMeetings = function (userId) {
        return dal.http.GET("user/" + userId + "/meeting");
    };

    this.saveMeeting = function (meetingToSave) {
        return dal.http.POST("meeting", meetingToSave);
    };

    this.updateMeeting = function (meetingToUpdate) {
        return dal.http.PUT("meeting", meetingToUpdate);
    };

    this.getMeetingComments = function (meetingId) {
        return dal.http.GET("meeting/" + meetingId + "/comment");
    };

    this.saveMeetingComments = function (meetingId, commentsToSave) {
        return dal.http.POST("meeting/" + meetingId + "/comment", commentsToSave);
    };

    $log.debug("dal:meetingDao Instantiated");
}]);
