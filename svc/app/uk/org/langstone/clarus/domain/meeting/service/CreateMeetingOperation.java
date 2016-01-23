package uk.org.langstone.clarus.domain.meeting.service;

import com.fasterxml.jackson.databind.JsonNode;
import io.jsonwebtoken.Claims;
import play.Logger;
import play.libs.Json;
import play.mvc.Http;
import uk.org.langstone.clarus.dal.meeting.MeetingRepository;
import uk.org.langstone.clarus.domain.meeting.model.Meeting;
import uk.org.langstone.clarus.domain.meeting.model.MeetingAttendee;
import uk.org.langstone.clarus.domain.ServiceResult;
import uk.org.langstone.clarus.infrastructure.mail.EmailService;
import uk.org.langstone.clarus.infrastructure.security.authentication.Principal;

import javax.inject.Inject;

public class CreateMeetingOperation {
    private static final Logger.ALogger LOG = Logger.of(CreateMeetingOperation.class);

    private final MeetingRepository meetingRepository;
    private final EmailService emailService;

    @Inject
    public CreateMeetingOperation(
            MeetingRepository meetingRepository,
            EmailService emailService) {
        this.meetingRepository = meetingRepository;
        this.emailService = emailService;
    }

    public ServiceResult execute(JsonNode jsonRequest) {
        final Meeting meetingToSave = Json.fromJson(jsonRequest, Meeting.class);

        final Principal principal = (Principal) Http.Context.current().args.get(Principal.class.getName());
        final Claims claims = principal.getClaims();
        final MeetingAttendee owner = new MeetingAttendee();
        owner.setId(new Integer((String) claims.get("id")));
        owner.setForename((String) claims.get("forename"));
        owner.setSurname((String) claims.get("surname"));
        owner.setEmail((String) claims.get("email"));
        owner.setRole(MeetingAttendee.Role.OWNER);
        meetingToSave.setOwner(owner);

        final Meeting savedMeeting = meetingRepository.set(meetingToSave);

        return new ServiceResult(Json.toJson(savedMeeting));
    }
}
