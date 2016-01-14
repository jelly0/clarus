package uk.org.langstone.clarus.dal.jpa.meeting;

import uk.org.langstone.clarus.dal.jpa.user.UserEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "meeting_user")
public class MeetingUserEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "meeting_id", nullable = false)
    public Integer meetingId;

    @Column(name = "user_email", nullable = false)
    public String userEmail;

    @Column(name = "role", nullable = true)
    private String role;

    @ManyToOne
    @JoinColumn(name = "meeting_id", referencedColumnName = "id", insertable = false, updatable = false)
    private MeetingEntity meeting;

    @ManyToOne
    @JoinColumn(name = "user_email", referencedColumnName = "email", insertable = false, updatable = false)
    private UserEntity user;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public MeetingEntity getMeeting() {
        return meeting;
    }

    public void setMeeting(MeetingEntity meeting) {
        this.meeting = meeting;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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
        MeetingUserEntity that = (MeetingUserEntity) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(meetingId, that.meetingId) &&
                Objects.equals(userEmail, that.userEmail) &&
                Objects.equals(role, that.role) &&
                Objects.equals(meeting, that.meeting) &&
                Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, meetingId, userEmail, role, meeting, user);
    }
}
