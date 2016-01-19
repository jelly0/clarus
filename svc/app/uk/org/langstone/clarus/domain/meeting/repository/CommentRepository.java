package uk.org.langstone.clarus.domain.meeting.repository;

import uk.org.langstone.clarus.domain.meeting.model.Comment;

import java.util.List;

public interface CommentRepository {

    List<Comment> findCommentsForMeeting(Integer meetingId);
    void addCommentsToMeeting(List<Comment> comments);
    Comment set(Comment comment);
}
