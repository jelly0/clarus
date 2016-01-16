package uk.org.langstone.clarus.dal.meeting;

import play.Logger;
import uk.org.langstone.clarus.dal.EntityManagerProvider;
import uk.org.langstone.clarus.domain.SessionStatus;
import uk.org.langstone.clarus.domain.meeting.model.Meeting;
import uk.org.langstone.clarus.domain.meeting.model.MeetingAttendee;
import uk.org.langstone.clarus.domain.meeting.MeetingRepository;

import javax.inject.Inject;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class MeetingJpaRepository implements MeetingRepository {
    private static final Logger.ALogger LOG = Logger.of(MeetingJpaRepository.class);

    private final EntityManagerProvider emProvider;
    private final MeetingMapper meetingMapper;

    @Inject
    public MeetingJpaRepository(EntityManagerProvider emProvider,
                                MeetingMapper meetingMapper) {
        this.emProvider = emProvider;
        this.meetingMapper = meetingMapper;
    }

    @Override
    public Meeting set(Meeting meeting) {
        final MeetingEntity newMeetingEntity = meetingMapper.meetingToEntity(meeting);

        emProvider.getEntityManager().persist(newMeetingEntity);
        meeting.setId((Integer) emProvider.getEntityManager().getEntityManagerFactory().getPersistenceUnitUtil().getIdentifier(newMeetingEntity));
        newMeetingEntity.setAttendees(meetingMapper.meetingUsersToEntityList(meeting));
        emProvider.getEntityManager().merge(newMeetingEntity);
        emProvider.getEntityManager().refresh(newMeetingEntity);

        return meetingMapper.meetingToBusinessObject(newMeetingEntity);
    }

    @Override
    public Meeting get(Integer meetingId) {
        final Query query = emProvider.getEntityManager().createNamedQuery(MeetingEntity.FIND_BY_ID);

        query.setParameter(MeetingEntity.MEETING_ID_PARAM, meetingId);

        return meetingMapper.meetingToBusinessObject((MeetingEntity) query.getSingleResult());
    }

    @Override
    public List<Meeting> getAll() {
        final List<MeetingEntity> meetingEntities = emProvider.getEntityManager().createNamedQuery(MeetingEntity.FIND_ALL).getResultList();
        return meetingMapper.meetingsToBusinessObjectList(meetingEntities);
    }

    @Override
    public void update(Meeting meeting) {
        final Query query = emProvider.getEntityManager().createNamedQuery(MeetingEntity.FIND_BY_ID);

        query.setParameter(MeetingEntity.MEETING_ID_PARAM, meeting.getId());
        final MeetingEntity meetingEntityToUpdate = (MeetingEntity) query.getSingleResult();

        meetingEntityToUpdate.setSubject(meeting.getSubject());
        meetingEntityToUpdate.setSummary(meeting.getSummary());
        meetingEntityToUpdate.setStatus(meeting.getStatus().name());

        final List<MeetingUserEntity> updatedAttendeesList = new ArrayList<>();
        for (MeetingAttendee meetingAttendee : meeting.getAttendees()) {
            if (meetingAttendee.getSessionStatus() == SessionStatus.NEW) {
                updatedAttendeesList.add(meetingMapper.meetingUserToEntity(meetingAttendee, meeting));
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
        meetingEntityToUpdate.setAttendees(updatedAttendeesList);
        emProvider.getEntityManager().merge(meetingEntityToUpdate);
    }

    @Override
    public void remove(Meeting meeting) {
        final MeetingEntity meetingToRemove = emProvider.getEntityManager().getReference(MeetingEntity.class, meeting.getId());
        emProvider.getEntityManager().remove(meetingToRemove);
    }

    @Override
    public List<Meeting> findProjectMeetings(Integer projectId) {
        final Query query = emProvider.getEntityManager().createNamedQuery(MeetingEntity.FIND_ALL_FOR_PROJECT);
        query.setParameter(MeetingEntity.PROJECT_ID_PARAM, projectId);

        final List<MeetingEntity> meetingEntities = query.getResultList();
        return meetingMapper.meetingsToBusinessObjectList(meetingEntities);
    }
}
