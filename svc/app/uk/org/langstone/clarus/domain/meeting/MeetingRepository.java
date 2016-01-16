package uk.org.langstone.clarus.domain.meeting;

import uk.org.langstone.clarus.domain.meeting.model.Meeting;

import java.util.List;

public interface MeetingRepository {

    List<Meeting> findProjectMeetings(Integer projectId);

    Meeting get(Integer meetingId);

    List<Meeting> getAll();

    void update(Meeting meeting);

    void remove(Meeting meeting);

    Meeting set(Meeting meeting);

}
