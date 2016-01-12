package uk.org.langstone.clarus.dal.jpa.meeting;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class MeetingUserId implements Serializable {

    @Column(name = "meeting_id", nullable = false)
    public Integer meetingId;

    @Column(name = "user_email", nullable = false)
    public String userEmail;

    public Integer getMeetingId() {
        return meetingId;
    }

    public void setMeetingId(Integer meetingId) {
        this.meetingId = meetingId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MeetingUserId that = (MeetingUserId) o;
        return Objects.equals(meetingId, that.meetingId) &&
                Objects.equals(userEmail, that.userEmail);
    }

    @Override
    public int hashCode() {
        return Objects.hash(meetingId, userEmail);
    }
}
