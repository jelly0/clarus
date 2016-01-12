package uk.org.langstone.clarus.domain.service.meeting;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import play.Logger;
import play.libs.Json;
import uk.org.langstone.clarus.domain.model.Comment.Comment;
import uk.org.langstone.clarus.domain.model.Comment.CommentRepository;
import uk.org.langstone.clarus.domain.service.ServiceResult;

import javax.inject.Inject;
import java.io.IOException;
import java.util.List;

public class CreateCommentOperation {
    private static final Logger.ALogger LOG = Logger.of(CreateMeetingOperation.class);

    private final CommentRepository commentRepository;

    @Inject
    public CreateCommentOperation(
            CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public ServiceResult execute(Integer meetingId, JsonNode jsonRequest) {
        try {
            final ObjectMapper objectMapper = new ObjectMapper();
            final List<Comment> commentsToSave = objectMapper.readValue(jsonRequest.toString(), new TypeReference<List<Comment>>() {});

            commentRepository.addCommentsToMeeting(commentsToSave);

            final List<Comment> comments = commentRepository.findCommentsForMeeting(meetingId);
            return new ServiceResult(Json.toJson(comments));


        } catch (IOException e) {
            return new ServiceResult(ServiceResult.Status.OP_ERROR, e.getMessage());
        }
    }
}
