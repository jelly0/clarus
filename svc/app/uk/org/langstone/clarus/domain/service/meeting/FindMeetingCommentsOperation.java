package uk.org.langstone.clarus.domain.service.meeting;

import play.Logger;
import play.libs.Json;
import uk.org.langstone.clarus.domain.model.Comment.Comment;
import uk.org.langstone.clarus.domain.model.Comment.CommentRepository;
import uk.org.langstone.clarus.domain.service.ServiceResult;

import javax.inject.Inject;
import java.util.List;

public class FindMeetingCommentsOperation {
    private static final Logger.ALogger LOG = Logger.of(FindMeetingCommentsOperation.class);

    private final CommentRepository repository;

    @Inject
    public FindMeetingCommentsOperation(CommentRepository repository) {
        this.repository = repository;
    }

    public ServiceResult execute(Integer meetingId) {
        final List<Comment> comments = repository.findCommentsForMeeting(meetingId);
        return new ServiceResult(Json.toJson(comments));
    }
}
