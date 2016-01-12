"use strict";

angular.module('app').controller("reviewCtrl", ["$log", "$scope", "$state", "$stateParams", "$uibModal", "repository", "userContext",
    function ($log, $scope, $state, $stateParams, $uibModal, repository, userContext) {
        var vm = $scope;
        var meetingRepository = repository.getRepository($$repository.MEETING);
        var commentRepository = repository.getRepository($$repository.COMMENT);

        (function init() {
            vm.waiting = true;
            vm.meeting = meetingRepository.getMeetingById($stateParams.projectId, $stateParams.meetingId);
            vm.role = meetingRepository.getMeetingRole($stateParams.projectId, $stateParams.meetingId, userContext.getUser().id);
            vm.comments = commentRepository.getMeetingComments($stateParams.meetingId).then(
                function (comments) {
                    vm.comments = comments;
                    vm.waiting = false;
                }, function (error) {
                    vm.waiting = false;
                    $$dialog.error(" We've encountered a problem while loading your meeting comments.  Please try again later");
                })
        })();

        vm.addComment = function (parentComment) {
            $uibModal.open({
                animation: true,
                templateUrl: 'feature/user/project/meeting/review/comment-form.html',
                controller: 'commentFormCtrl',
                size: "xs",
                backdrop: 'static',
                resolve: {
                    params: {
                        parentComment: parentComment,
                        isReply: parentComment != null
                    }
                }
            }).result.then(function result(newComment) {
                newComment.user = {
                    userId: userContext.getUser().id,
                    meetingId: vm.meeting.id,
                    forename: userContext.getUser().forename,
                    surname: userContext.getUser().surname,
                    email: userContext.getUser().email,
                    role: vm.role
                };
                newComment.meetingId = vm.meeting.id;
                newComment.entryDate = new Date();
                if (parentComment == undefined) {
                    newComment.replies = [];
                    vm.comments.push(newComment);
                } else {
                    newComment.parentCommentId = parentComment.id;
                    parentComment.replies.push(newComment);
                }
            }, function closed() {
            });
        };

        vm.amendReply = function (reply) {
            vm.amendComment(reply, true);
        };

        vm.amendComment = function (commentToAmend, isReply) {
            if (isReply == undefined) {
                isReply = false;
            }

            $uibModal.open({
                animation: true,
                templateUrl: 'feature/user/project/meeting/review/comment-form.html',
                controller: 'commentFormCtrl',
                size: "xs",
                backdrop: 'static',
                resolve: {
                    params: {
                        comment: commentToAmend,
                        isReply: isReply
                    }
                }
            }).result.then(function result(amenedComment) {
                commentToAmend.reference = amenedComment.reference;
                commentToAmend.text = amenedComment.text;
            }, function closed() {
            });
        };

        vm.deleteComment = function (commentToDelete) {
            $$dialog.confirm("Are you sure that you want to delete this comment?", "Delete", function () {
                _.remove(vm.comments, function (comment) {
                    return commentToDelete.entryDate == comment.entryDate;
                });
                $scope.$apply();
            });
        };

        vm.deleteReply = function (parentComment, replyToDelete) {
            $$dialog.confirm("Are you sure that you want to delete this reply?", "Delete", function () {
                _.remove(parentComment.replies, function (reply) {
                    return replyToDelete.entryDate == reply.entryDate;
                });
                $scope.$apply();
            });
        };

        vm.cancel = function () {
            userContext.returnToLastState();
        };

        vm.save = function () {
            var waitingDialog = $$dialog.waiting("Saving comments - Please Wait");
            commentRepository.saveMeetingComments(vm.meeting.id, vm.comments).then(
                function success(savedMeetings) {
                    vm.comments = savedMeetings;
                    waitingDialog.close();
                },
                function error(error) {
                    waitingDialog.close();
                    $$dialog.error("There has been a problem whist saving your comments.  Please try agagin later");
                });
        };

        vm.isNew = function (comment) {
            return comment.id == undefined;
        };
    }]);

