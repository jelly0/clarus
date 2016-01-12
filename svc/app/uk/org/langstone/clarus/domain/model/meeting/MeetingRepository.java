package uk.org.langstone.clarus.domain.model.meeting;

import uk.org.langstone.clarus.domain.model.Repository;

import java.util.List;

public interface MeetingRepository extends Repository<Meeting, Integer> {

    List<Meeting> findProjectMeetings(Integer projectId);
}
