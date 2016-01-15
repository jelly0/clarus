package uk.org.langstone.clarus.domain.service.meeting;

import com.fasterxml.jackson.databind.JsonNode;
import io.jsonwebtoken.Claims;
import play.Logger;
import play.libs.Json;
import play.mvc.Http;
import uk.org.langstone.clarus.domain.model.meeting.Meeting;
import uk.org.langstone.clarus.domain.model.meeting.MeetingAttendee;
import uk.org.langstone.clarus.domain.model.meeting.MeetingRepository;
import uk.org.langstone.clarus.domain.service.ServiceResult;
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

        owner.setId((Integer) claims.get("id"));
        owner.setForename((String) claims.get("forename"));
        owner.setSurname((String) claims.get("surname"));
        owner.setEmail((String) claims.get("email"));
        owner.setRole(MeetingAttendee.Role.OWNER);

        meetingToSave.getAttendees().add(owner);
        final Meeting savedMeeting = meetingRepository.set(meetingToSave);

        final Meeting meetingWithUserInfo = meetingRepository.get(savedMeeting.getId());
        return new ServiceResult(Json.toJson(meetingWithUserInfo));
    }
}
