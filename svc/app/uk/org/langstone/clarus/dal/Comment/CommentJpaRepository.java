package uk.org.langstone.clarus.dal.Comment;

import play.Logger;
import uk.org.langstone.clarus.dal.EntityManagerProvider;
import uk.org.langstone.clarus.domain.meeting.model.Comment;
import uk.org.langstone.clarus.domain.meeting.repository.CommentRepository;

import javax.inject.Inject;
import javax.persistence.Query;
import java.util.List;

public class CommentJpaRepository implements CommentRepository {
    private static final Logger.ALogger LOG = Logger.of(CommentJpaRepository.class);

    private final EntityManagerProvider emProvider;
    private final CommentMapper commentMapper;

    @Inject
    public CommentJpaRepository(EntityManagerProvider emProvider,
                                CommentMapper commentMapper) {
        this.emProvider = emProvider;
        this.commentMapper = commentMapper;
    }

    @Override
    public Comment set(Comment comment) {
        final CommentEntity newCommentEntity = commentMapper.commentToEntity(comment);
        emProvider.getEntityManager().persist(newCommentEntity);
        final Integer commentId = (Integer) emProvider.getEntityManager().getEntityManagerFactory().getPersistenceUnitUtil().getIdentifier(newCommentEntity);
        newCommentEntity.setParentCommentId(commentId);
        return commentMapper.commentEntityToBusinessObject(newCommentEntity);
    }

    @Override
    public List<Comment> findCommentsForMeeting(Integer meetingId) {
        final Query commentQuery = emProvider.getEntityManager().createNamedQuery(CommentEntity.FIND_ALL_FOR_MEETING);
        commentQuery.setParameter(CommentEntity.MEETING_ID_PARAM, meetingId);
        return commentMapper.commentsToBusinessObjectList(commentQuery.getResultList());
    }

    @Override
    public void addCommentsToMeeting(List<Comment> comments) {
        for (Comment comment : comments) {
            final CommentEntity commentEntityToSave = commentMapper.commentToEntity(comment);
            emProvider.getEntityManager().persist(commentEntityToSave);
        }
    }
}
