package uk.org.langstone.clarus.dal.meeting;

import play.Logger;
import uk.org.langstone.clarus.dal.EntityManagerProvider;
import uk.org.langstone.clarus.domain.SessionStatus;
import uk.org.langstone.clarus.domain.meeting.model.Meeting;
import uk.org.langstone.clarus.domain.meeting.model.MeetingAttendee;

import javax.inject.Inject;
import javax.persistence.Query;
import java.util.Iterator;
import java.util.List;

public class MeetingRepository {
    private static final Logger.ALogger LOG = Logger.of(MeetingRepository.class);

    private final EntityManagerProvider emProvider;
    private final MeetingMapper meetingMapper;

    @Inject
    public MeetingRepository(EntityManagerProvider emProvider,
                             MeetingMapper meetingMapper) {
        this.emProvider = emProvider;
        this.meetingMapper = meetingMapper;
    }

    public Meeting set(Meeting meeting) {
        final MeetingEntity newMeetingEntity = meetingMapper.meetingToEntity(meeting);

        emProvider.getEntityManager().persist(newMeetingEntity);
        meeting.setId((Integer) emProvider.getEntityManager().getEntityManagerFactory().getPersistenceUnitUtil().getIdentifier(newMeetingEntity));
        newMeetingEntity.setAttendees(meetingMapper.meetingUsersToEntityList(meeting));
        emProvider.getEntityManager().merge(newMeetingEntity);
        emProvider.getEntityManager().flush();
        emProvider.getEntityManager().refresh(newMeetingEntity);

        return meetingMapper.meetingToBusinessObject(newMeetingEntity);
    }

    public Meeting get(Integer meetingId) {
        return meetingMapper.meetingToBusinessObject(emProvider.getEntityManager().find(MeetingEntity.class, meetingId));
    }

    public List<Meeting> getAll() {
        final List<MeetingEntity> meetingEntities = emProvider.getEntityManager().createNamedQuery(MeetingEntity.FIND_ALL).getResultList();
        return meetingMapper.meetingsToBusinessObjectList(meetingEntities);
    }

    public Meeting update(Meeting meeting) {
        final MeetingEntity meetingEntityToUpdate = emProvider.getEntityManager().find(MeetingEntity.class, meeting.getId());

        meetingEntityToUpdate.setSubject(meeting.getSubject());
        meetingEntityToUpdate.setSummary(meeting.getSummary());
        meetingEntityToUpdate.setStatus(meeting.getStatus().name());

        for (MeetingAttendee meetingAttendee : meeting.getAttendees()) {
            if (meetingAttendee.getSessionStatus() == SessionStatus.NEW) {
                final MeetingUserEntity newUserEntity = meetingMapper.meetingUserToEntity(meetingAttendee, meeting);

                emProvider.getEntityManager().persist(newUserEntity);
                emProvider.getEntityManager().flush();
                emProvider.getEntityManager().refresh(newUserEntity);
            } else if (meetingAttendee.getSessionStatus() == SessionStatus.REMOVED) {
                for (Iterator<MeetingUserEntity> it = meetingEntityToUpdate.getAttendees().iterator(); it.hasNext(); ) {
                    final MeetingUserEntity meetingUserEntityToCheck = it.next();
                    if (meetingUserEntityToCheck.getUserEmail().equals(meetingAttendee.getEmail())) {
                        it.remove();
                        emProvider.getEntityManager().remove(meetingUserEntityToCheck);
                        break;
                    }
                }
            }
        }
        emProvider.getEntityManager().merge(meetingEntityToUpdate);
        emProvider.getEntityManager().flush();
        emProvider.getEntityManager().refresh(meetingEntityToUpdate);

        return meetingMapper.meetingToBusinessObject(meetingEntityToUpdate);
    }

    public void remove(Meeting meeting) {
        final MeetingEntity meetingToRemove = emProvider.getEntityManager().getReference(MeetingEntity.class, meeting.getId());
        emProvider.getEntityManager().remove(meetingToRemove);
    }

    public List<Meeting> findProjectMeetings(Integer projectId) {
        final Query query = emProvider.getEntityManager().createNamedQuery(MeetingEntity.FIND_ALL_FOR_PROJECT);
        query.setParameter(MeetingEntity.PROJECT_ID_PARAM, projectId);

        final List<MeetingEntity> meetingEntities = query.getResultList();
        return meetingMapper.meetingsToBusinessObjectList(meetingEntities);
    }
}
