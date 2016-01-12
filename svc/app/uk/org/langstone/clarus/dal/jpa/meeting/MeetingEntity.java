package uk.org.langstone.clarus.dal.jpa.meeting;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Table(name = "meeting")
@Entity
@NamedQueries({
        @NamedQuery(name = MeetingEntity.FIND_ALL, query = "SELECT m FROM MeetingEntity m"),
        @NamedQuery(name = MeetingEntity.FIND_ALL_FOR_OWNER, query = "SELECT m FROM MeetingEntity m WHERE m.ownerId = :ownerId"),
        @NamedQuery(name = MeetingEntity.FIND_ALL_FOR_PROJECT, query = "SELECT m FROM MeetingEntity m WHERE m.projectId = :projectId"),
        @NamedQuery(name = MeetingEntity.FIND_BY_ID, query = "SELECT m FROM MeetingEntity m WHERE m.id = :meetingId")
})
public class MeetingEntity {
    public static final String FIND_ALL = "meetingEntity.FIND_ALL";
    public static final String FIND_ALL_FOR_OWNER = "meetingEntity.FIND_ALL_FOR_OWNER";
    public static final String FIND_ALL_FOR_PROJECT = "meetingEntity.FIND_ALL_FOR_PROJECT";
    public static final String FIND_BY_ID = "meetingEntity.FIND_BY_ID";
    public static final String OWNER_ID_PARAM = "ownerId";
    public static final String MEETING_ID_PARAM = "meetingId";
    public static final String PROJECT_ID_PARAM = "projectId";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "subject", nullable = false)
    private String subject;

    @Column(name = "scheduled_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date scheduledDate;

    @Column(name = "review_by_date", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date reviewByDate;

    @Column(name = "summary", nullable = false)
    private String summary;

    @Column(name = "owner_user_id", nullable = false)
    private String ownerId;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "project_id", nullable = false)
    private Integer projectId;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "meeting")
    private List<MeetingUserEntity> attendees;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Date getScheduledDate() {
        return scheduledDate;
    }

    public void setScheduledDate(Date scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

    public Date getReviewByDate() {
        return reviewByDate;
    }

    public void setReviewByDate(Date reviewBy) {
        this.reviewByDate = reviewBy;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    public List<MeetingUserEntity> getAttendees() {
        return attendees;
    }

    public void setAttendees(List<MeetingUserEntity> attendees) {
        this.attendees = attendees;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MeetingEntity that = (MeetingEntity) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(subject, that.subject) &&
                Objects.equals(scheduledDate, that.scheduledDate) &&
                Objects.equals(reviewByDate, that.reviewByDate) &&
                Objects.equals(summary, that.summary) &&
                Objects.equals(ownerId, that.ownerId) &&
                Objects.equals(status, that.status) &&
                Objects.equals(projectId, that.projectId) &&
                Objects.equals(attendees, that.attendees);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, subject, scheduledDate, reviewByDate, summary, ownerId, status, projectId, attendees);
    }
}
