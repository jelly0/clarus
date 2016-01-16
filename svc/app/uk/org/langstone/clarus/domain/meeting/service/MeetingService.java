package uk.org.langstone.clarus.domain.meeting.service;

import com.fasterxml.jackson.databind.JsonNode;
import uk.org.langstone.clarus.domain.ServiceResult;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class MeetingService {
    private final CreateMeetingOperation createMeetingOperation;
    private final UpdateMeetingOperation updateMeetingOperation;
    private final FindMeetingOperation findMeetingOperation;
    private final FindProjectMeetingsOperation findProjectMeetingsOperation;
    private final FindMeetingCommentsOperation findMeetingCommentsOperation;
    private final CreateCommentOperation createCommentOperation;

    @Inject
    public MeetingService(CreateMeetingOperation createMeetingOperation,
                          UpdateMeetingOperation updateMeetingOperation,
                          FindMeetingOperation findMeetingOperation,
                          FindProjectMeetingsOperation findProjectMeetingsOperation,
                          FindMeetingCommentsOperation findMeetingCommentsOperation,
                          CreateCommentOperation createCommentOperation) {
        this.createMeetingOperation = createMeetingOperation;
        this.updateMeetingOperation = updateMeetingOperation;
        this.findMeetingOperation = findMeetingOperation;
        this.findProjectMeetingsOperation = findProjectMeetingsOperation;
        this.findMeetingCommentsOperation = findMeetingCommentsOperation;
        this.createCommentOperation = createCommentOperation;
    }

    public ServiceResult create(JsonNode jsonResource) {
        return createMeetingOperation.execute(jsonResource);
    }

    public ServiceResult update(JsonNode jsonResource) {
        return updateMeetingOperation.execute(jsonResource);
    }

    public ServiceResult find(Integer meetingId) {
        return findMeetingOperation.execute(meetingId);
    }

    public ServiceResult findProjectMeetings(Integer projectId) {
        return findProjectMeetingsOperation.execute(projectId);
    }

    public ServiceResult findMeetingComments(final Integer meetingId) {
        return findMeetingCommentsOperation.execute(meetingId);
    }

    public ServiceResult createComments(Integer meetingId, JsonNode jsonResource) {
        return createCommentOperation.execute(meetingId, jsonResource);
    }
}
