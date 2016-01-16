package uk.org.langstone.clarus.domain.meeting.service;

import com.fasterxml.jackson.databind.JsonNode;
import play.Logger;
import play.libs.Json;
import uk.org.langstone.clarus.domain.meeting.model.Meeting;
import uk.org.langstone.clarus.domain.meeting.MeetingRepository;
import uk.org.langstone.clarus.domain.ServiceResult;

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

        final Meeting updatedMeeting = meetingRepository.update(meeting);

        // TODO Email & ID

        return new ServiceResult(jsonRequest);
    }
}
