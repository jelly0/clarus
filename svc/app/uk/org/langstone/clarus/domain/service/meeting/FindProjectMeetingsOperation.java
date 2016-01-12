package uk.org.langstone.clarus.domain.service.meeting;

import play.Logger;
import play.libs.Json;
import uk.org.langstone.clarus.domain.model.meeting.Meeting;
import uk.org.langstone.clarus.domain.model.meeting.MeetingRepository;
import uk.org.langstone.clarus.domain.service.ServiceResult;

import javax.inject.Inject;
import java.util.List;

public class FindProjectMeetingsOperation {
    private static final Logger.ALogger LOG = Logger.of(CreateMeetingOperation.class);

    private final MeetingRepository meetingRepository;

    @Inject
    public FindProjectMeetingsOperation(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    public ServiceResult execute(Integer projectId) {
        final List<Meeting> meetings = meetingRepository.findProjectMeetings(projectId);
        return new ServiceResult(Json.toJson(meetings));
    }
}
