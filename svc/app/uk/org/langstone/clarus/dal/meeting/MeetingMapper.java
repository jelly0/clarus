package uk.org.langstone.clarus.dal.meeting;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import uk.org.langstone.clarus.domain.RepositoryObjectFactory;
import uk.org.langstone.clarus.domain.meeting.model.Meeting;
import uk.org.langstone.clarus.domain.meeting.model.MeetingAttendee;

import java.util.ArrayList;
import java.util.List;

@Singleton
public class MeetingMapper {

    private final RepositoryObjectFactory repositoryObjectFactory;

    @Inject
    public MeetingMapper(RepositoryObjectFactory repositoryObjectFactory) {
        this.repositoryObjectFactory = repositoryObjectFactory;
    }

    public MeetingEntity meetingToEntity(Meeting meeting) {
        final MeetingEntity meetingEntity = new MeetingEntity();

        meetingEntity.setId(meeting.getId());
        meetingEntity.setSubject(meeting.getSubject());
        meetingEntity.setScheduledDate(meeting.getScheduledDate());
        meetingEntity.setReviewByDate(meeting.getReviewByDate());
        meetingEntity.setSummary(meeting.getSummary());
        meetingEntity.setStatus(meeting.getStatus().name());
        meetingEntity.setProjectId(meeting.getProjectId());

        return meetingEntity;
    }

    public MeetingUserEntity meetingUserToEntity(MeetingAttendee meetingAttendee, Meeting meeting) {
        return meetingUserToEntity(meetingAttendee, meeting.getId());
    }

    public MeetingUserEntity meetingUserToEntity(MeetingAttendee meetingAttendee, Integer meetingId) {
        final MeetingUserEntity meetingUserEntity = new MeetingUserEntity();

        meetingUserEntity.setId(meetingAttendee.getId());
        meetingUserEntity.setMeetingId(meetingId);
        meetingUserEntity.setUserEmail(meetingAttendee.getEmail());
        meetingUserEntity.setRole(meetingAttendee.getRole().name());

        return meetingUserEntity;
    }

    public List<MeetingUserEntity> meetingUsersToEntityList(Meeting meeting) {
        final List<MeetingUserEntity> meetingUserEntities = new ArrayList<>();

        for (MeetingAttendee meetingAttendee : meeting.getAttendees()) {
            meetingUserEntities.add(meetingUserToEntity(meetingAttendee, meeting));
        }

        meetingUserEntities.add(meetingUserToEntity(meeting.getOwner(), meeting.getId()));

        return meetingUserEntities;
    }

    public MeetingAttendee meetingUserToBusinessObject(MeetingUserEntity userEntity) {
        final MeetingAttendee member = new MeetingAttendee();

        member.setId(userEntity.getId());
        member.setMeetingId(userEntity.getMeetingId());
        member.setEmail(userEntity.getUserEmail());
        member.setRole(MeetingAttendee.Role.valueOf(userEntity.getRole()));

        // User may not have register yet
        if (userEntity.getUser() != null) {
            member.setUserId(userEntity.getUser().getId());
            member.setForename(userEntity.getUser().getForename());
            member.setSurname(userEntity.getUser().getSurname());
        }

        return member;
    }

    public List<Meeting> meetingsToBusinessObjectList(List<MeetingEntity> meetingEntities) {
        final List<Meeting> meetings = new ArrayList<>();

        for (MeetingEntity meetingEntity : meetingEntities) {
            meetings.add(meetingToBusinessObject(meetingEntity));
        }

        return meetings;
    }

    public Meeting meetingToBusinessObject(MeetingEntity meetingEntity) {
        final Meeting meeting = repositoryObjectFactory.createBusinessObject(meetingEntity, Meeting.class);
        final List<MeetingAttendee> attendees = new ArrayList<>();

        for (MeetingUserEntity userEntity : meetingEntity.getAttendees()) {
            final MeetingAttendee attendee = meetingUserToBusinessObject(userEntity);

            if (attendee.getRole().equals(MeetingAttendee.Role.OWNER)) {
                meeting.setOwner(attendee);
            } else {
                attendees.add(attendee);
            }
        }
        meeting.setAttendees(attendees);
        return meeting;
    }
}
