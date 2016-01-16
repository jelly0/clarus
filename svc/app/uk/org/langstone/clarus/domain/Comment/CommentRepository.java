package uk.org.langstone.clarus.domain.comment;

import uk.org.langstone.clarus.domain.comment.model.Comment;

import java.util.List;

public interface CommentRepository {

    List<Comment> findCommentsForMeeting(Integer meetingId);
    void addCommentsToMeeting(List<Comment> comments);
    Comment set(Comment comment);
}
