package uk.org.langstone.clarus.endpoint;

import play.Logger;
import play.db.jpa.Transactional;
import play.mvc.Result;
import uk.org.langstone.clarus.domain.meeting.service.MeetingService;

import javax.inject.Inject;

public class MeetingEndpoint extends ResourceEndpoint {
    private static final Logger.ALogger LOG = Logger.of(MeetingEndpoint.class);

    private final MeetingService meetingService;

    @Inject
    public MeetingEndpoint(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    @Transactional
    public Result find(final Integer id) {
        return response(meetingService.find(id));
    }

    @Transactional
    public Result create() {
        return response(meetingService.create(request().body().asJson()));
    }

    @Transactional
    public Result update() {
        return response(meetingService.update(request().body().asJson()));
    }

    @Transactional
    public Result findCommentsForMeeting(final Integer meetingId) {
        return response(meetingService.findMeetingComments(meetingId));
    }

    @Transactional
    public Result addCommentsToMeeting(final Integer meetingId)  {
        return response(meetingService.createComments(meetingId, request().body().asJson()));
    }
}
