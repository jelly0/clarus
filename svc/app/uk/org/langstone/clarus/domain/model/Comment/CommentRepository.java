package uk.org.langstone.clarus.domain.model.Comment;

import uk.org.langstone.clarus.domain.model.Repository;

import java.util.List;

public interface CommentRepository extends Repository<Comment, Integer> {

    List<Comment> findCommentsForMeeting(Integer meetingId);
    void addCommentsToMeeting(List<Comment> comments);
}
