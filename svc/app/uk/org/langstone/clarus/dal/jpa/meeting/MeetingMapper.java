package uk.org.langstone.clarus.dal.jpa.meeting;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import uk.org.langstone.clarus.domain.model.RepositoryObjectFactory;
import uk.org.langstone.clarus.domain.model.meeting.Meeting;
import uk.org.langstone.clarus.domain.model.meeting.MeetingAttendee;

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
        return repositoryObjectFactory.createEntity(meeting, MeetingEntity.class);
    }

    public MeetingUserEntity meetingUserToEntity(MeetingAttendee meetingAttendee, Meeting meeting) {
        return meetingUserToEntity(meetingAttendee, meeting.getId());
    }

    public MeetingUserEntity meetingUserToEntity(MeetingAttendee meetingAttendee, Integer meetingId) {
        final MeetingUserEntity meetingUserEntity = new MeetingUserEntity();
        final MeetingUserId meetingUserId = new MeetingUserId();

        meetingUserId.setMeetingId(meetingId);
        meetingUserId.setUserEmail(meetingAttendee.getEmail());

        meetingUserEntity.setId(meetingUserId);
        meetingUserEntity.setUserId(meetingAttendee.getUserId());
        meetingUserEntity.setForename(meetingAttendee.getForename());
        meetingUserEntity.setSurname(meetingAttendee.getSurname());
        meetingUserEntity.setRole(meetingAttendee.getRole().name());

        return meetingUserEntity;
    }

    public List<MeetingUserEntity> meetingUsersToEntityList(Meeting meeting) {
        final List<MeetingUserEntity> meetingUserEntities = new ArrayList<>();
        for (MeetingAttendee meetingAttendee : meeting.getAttendees()) {
            meetingUserEntities.add(meetingUserToEntity(meetingAttendee, meeting));
        }
        return meetingUserEntities;
    }

    public MeetingAttendee meetingUserToBusinessObject(MeetingUserEntity userEntity) {
        final MeetingAttendee member = new MeetingAttendee();
        member.setMeetingId(userEntity.getId().meetingId);
        member.setUserId(userEntity.getUserId());
        member.setEmail(userEntity.getId().getUserEmail());
        member.setForename(userEntity.getForename());
        member.setSurname(userEntity.getSurname());
        member.setRole(MeetingAttendee.Role.valueOf(userEntity.getRole()));

        return member;
    }

    public List<Meeting> meetingsToBusinessObjectList(List<MeetingEntity> meetingEntities) {
        final List<Meeting> meetings = new ArrayList<>();

        for (MeetingEntity meetingEntity : meetingEntities) {
            final Meeting meeting = repositoryObjectFactory.createBusinessObject(meetingEntity, Meeting.class);
            final List<MeetingAttendee> members = new ArrayList<>();
            for (MeetingUserEntity userEntity : meetingEntity.getAttendees()) {
                members.add(meetingUserToBusinessObject(userEntity));
            }
            meeting.setAttendees(members);
            meetings.add(meeting);
        }
        return meetings;
    }

    public Meeting meetingToBusinessObject(MeetingEntity meetingEntity) {
        final Meeting meeting = repositoryObjectFactory.createBusinessObject(meetingEntity, Meeting.class);
        final List<MeetingAttendee> members = new ArrayList<>();
        for (MeetingUserEntity userEntity : meetingEntity.getAttendees()) {
            members.add(meetingUserToBusinessObject(userEntity));
        }
        meeting.setAttendees(members);
        return meeting;
    }
}
