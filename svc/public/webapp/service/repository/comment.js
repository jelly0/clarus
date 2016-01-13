"use strict";

angular.module("clarus").service("commentRepository", ["$q", "$log", "$rootScope", "contextEvent", "meetingDao",
    function ($q, $log, $rootScope, contextEvent, meetingDao) {
        var commentCache = {};
        var mapCommentsToModel = function (comments) {
            for (var i = 0; i < comments.length; i++) {
                comments[i].entrydDate = new Date(comments[i].entryDate);
                if (comments[i].hasOwnProperty("replies") && comments[i].replies != null) {
                    for (var j = 0; j < comments[i].replies.length; j++) {
                        comments[i].replies[j].entrydDate = new Date(comments[i].replies[j].entrydDate);
                    }
                } else {
                    comments[i].replies = [];
                }
            }
        };

        (function init() {
            $rootScope.$on(contextEvent.CLEAR_CONTEXT, function clearContext() {
                commentCache = {};
                $log.debug("commentRepository: context cleared");
            })
        })();

        this.getMeetingComments = function (meetingId) {
            var deferred = $q.defer();
            if (commentCache.hasOwnProperty(meetingId)) {
                deferred.resolve(commentCache[meetingId]);
            } else {
                meetingDao.getMeetingComments(meetingId).then(
                    function (comments) {
                        commentCache[meetingId] = comments;
                        mapCommentsToModel(comments);
                        deferred.resolve(comments);
                    }, function (error) {
                        deferred.reject(error);
                    });
            }
            return deferred.promise;
        };

        this.saveMeetingComments = function (meetingId, commentsToSave) {
            var deferred = $q.defer();
            var newComments = [];

            // Any comment or reply that has an ID has already been saved previously and will not be updated as per business rule
            for (var i = 0; i < commentsToSave.length; i++) {
                if (commentsToSave[i].hasOwnProperty("id")) {
                    if (commentsToSave[i].hasOwnProperty("replies")) {
                        for (var j = 0; j < commentsToSave[i].replies.length; j++) {
                            if (!commentsToSave[i].replies[j].hasOwnProperty("id")) {
                                var newReply = _.cloneDeep(commentsToSave[i].replies[j]);
                                newComments.push(newReply);
                            }
                        }
                    }
                } else {
                    // This is a reply to a comment, we are restricting replies to 1 deep
                    var newComment = _.cloneDeep(commentsToSave[i]);
                    delete newComment.replies;
                    newComments.push(newComment);
                }
            }

            meetingDao.saveMeetingComments(meetingId, newComments).then(
                function (savedComments) {
                    commentCache[meetingId] = savedComments;
                    mapCommentsToModel(savedComments);
                    deferred.resolve(savedComments);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        $log.debug("repository:commentRepository Instantiated");
    }]);
