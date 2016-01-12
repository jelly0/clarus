package uk.org.langstone.clarus.domain.service.meeting;

import com.fasterxml.jackson.databind.JsonNode;
import play.Logger;
import play.libs.Json;
import uk.org.langstone.clarus.domain.model.meeting.Meeting;
import uk.org.langstone.clarus.domain.model.meeting.MeetingRepository;
import uk.org.langstone.clarus.domain.service.ServiceResult;

import javax.inject.Inject;

public class UpdateMeetingOperation {
    private static final Logger.ALogger LOG = Logger.of(FindMeetingOperation.class);

    private final MeetingRepository meetingRepository;

    @Inject
    public UpdateMeetingOperation(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    public ServiceResult execute(JsonNode jsonRequest) {
        final Meeting meeting = Json.fromJson(jsonRequest, Meeting.class);

        meetingRepository.update(meeting);

        // TODO Email & ID

        return new ServiceResult(jsonRequest);
    }
}
