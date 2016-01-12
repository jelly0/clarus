package uk.org.langstone.clarus.dal.jpa.meeting;

import uk.org.langstone.clarus.dal.jpa.user.UserEntity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Objects;

@Entity
@NamedQueries({
        @NamedQuery(name = MeetingUserEntity.FIND_ALL_FOR_USER, query = "SELECT m FROM MeetingUserEntity m WHERE m.userId = :userId")
})
@Table(name = "meeting_user")
public class MeetingUserEntity implements Serializable {
    public static final String FIND_ALL_FOR_USER = "MeetingUserEntity.FIND_ALL_FOR_USER";
    public static final String USER_ID_PARAM = "userId";

    @EmbeddedId
    uk.org.langstone.clarus.dal.jpa.meeting.MeetingUserId id;

    @Column(name = "user_id", nullable = true)
    private Integer userId;

    @Column(name = "forename", nullable = true)
    private String forename;

    @Column(name = "surname", nullable = true)
    private String surname;

    @Column(name = "role", nullable = true)
    private String role;

    @ManyToOne
    @JoinColumn(name = "meeting_id", referencedColumnName = "id", insertable = false, updatable = false)
    private MeetingEntity meeting;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    private UserEntity user;

    public MeetingUserId getId() {
        return id;
    }

    public void setId(MeetingUserId id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getForename() {
        return forename;
    }

    public void setForename(String forename) {
        this.forename = forename;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MeetingUserEntity that = (MeetingUserEntity) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(userId, that.userId) &&
                Objects.equals(forename, that.forename) &&
                Objects.equals(surname, that.surname) &&
                Objects.equals(role, that.role) &&
                Objects.equals(meeting, that.meeting) &&
                Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userId, forename, surname, role, meeting, user);
    }
}
