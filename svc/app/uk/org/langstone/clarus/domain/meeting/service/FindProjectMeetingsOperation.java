package uk.org.langstone.clarus.domain.meeting.service;

import play.Logger;
import play.libs.Json;
import uk.org.langstone.clarus.dal.meeting.MeetingRepository;
import uk.org.langstone.clarus.domain.meeting.model.Meeting;
import uk.org.langstone.clarus.domain.ServiceResult;

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
