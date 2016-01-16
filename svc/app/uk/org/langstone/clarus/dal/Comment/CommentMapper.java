package uk.org.langstone.clarus.dal.Comment;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import uk.org.langstone.clarus.dal.meeting.MeetingMapper;
import uk.org.langstone.clarus.domain.comment.model.Comment;
import uk.org.langstone.clarus.domain.RepositoryObjectFactory;

import java.util.ArrayList;
import java.util.List;

@Singleton
public class CommentMapper {

    private final RepositoryObjectFactory repositoryObjectFactory;
    private final MeetingMapper meetingMapper;

    @Inject
    public CommentMapper(RepositoryObjectFactory repositoryObjectFactory,
                         MeetingMapper meetingMapper) {
        this.repositoryObjectFactory = repositoryObjectFactory;
        this.meetingMapper = meetingMapper;
    }

    public List<Comment> commentsToBusinessObjectList(List<CommentEntity> entityList) {
        final List<Comment> comments = new ArrayList<>();

        for (CommentEntity commentEntity : entityList) {
            final Comment comment = commentEntityToBusinessObject(commentEntity);
            comments.add(comment);
        }
        return comments;
    }

    public Comment commentEntityToBusinessObject(CommentEntity commentEntity) {
        final Comment comment = commentEntityToComment(commentEntity);
        final List<Comment> replies = new ArrayList<>();

        if (commentEntity.getReplies() != null) {
            for (CommentEntity replyEntity : commentEntity.getReplies()) {
                replies.add(commentEntityToComment(replyEntity));
            }
        }
        comment.setReplies(replies);
        return comment;
    }

    public CommentEntity commentToEntity(Comment comment) {
        final CommentEntity commentEntity = repositoryObjectFactory.createEntity(comment, CommentEntity.class);
        commentEntity.setUser(meetingMapper.meetingUserToEntity(comment.getUser(), commentEntity.getMeetingId()));
        commentEntity.setMeetingUserId(comment.getUser().getId());
        return commentEntity;
    }

    private Comment commentEntityToComment(CommentEntity commonEntity) {
        final Comment comment = new Comment();

        comment.setId(commonEntity.getId());
        comment.setEntryDate(commonEntity.getEntryDate());
        comment.setReference(commonEntity.getReference());
        comment.setMeetingId(commonEntity.getMeetingId());
        comment.setText(commonEntity.getText());
        comment.setParentCommentId(commonEntity.getParentCommentId());
        comment.setUser(meetingMapper.meetingUserToBusinessObject(commonEntity.getUser()));

        return comment;
    }
}
