package uk.org.langstone.clarus.domain.model.meeting;

import java.util.Date;
import java.util.List;
import java.util.Objects;

public class Meeting {
    public enum Status {SCHEDULED, CANCELLED};

    private Integer projectId;
    private Integer id;
    private String subject;
    private String summary;
    private Status status;
    private Date scheduledDate;
    private Date reviewByDate;
    private Integer ownerId;
    private List<MeetingAttendee> attendees;

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

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Integer getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Integer ownerId) {
        this.ownerId = ownerId;
    }

    public List<MeetingAttendee> getAttendees() {
        return attendees;
    }

    public void setAttendees(List<MeetingAttendee> attendees) {
        this.attendees = attendees;
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

    public void setReviewByDate(Date reviewByDate) {
        this.reviewByDate = reviewByDate;
    }

    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Meeting meeting = (Meeting) o;
        return Objects.equals(id, meeting.id) &&
                Objects.equals(subject, meeting.subject) &&
                Objects.equals(summary, meeting.summary) &&
                status == meeting.status &&
                Objects.equals(scheduledDate, meeting.scheduledDate) &&
                Objects.equals(reviewByDate, meeting.reviewByDate) &&
                Objects.equals(ownerId, meeting.ownerId) &&
                Objects.equals(projectId, meeting.projectId) &&
                Objects.equals(attendees, meeting.attendees);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, subject, summary, status, scheduledDate, reviewByDate, ownerId, projectId, attendees);
    }
}
