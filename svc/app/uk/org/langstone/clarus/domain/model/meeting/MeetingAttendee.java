package uk.org.langstone.clarus.domain.model.meeting;

import uk.org.langstone.clarus.domain.model.SessionStatus;

import java.util.Objects;

public class MeetingAttendee {
    public enum Role {OWNER, REVIEW, APPROVE, INFORM}

    private Integer meetingId;
    private Integer userId;
    private String email;
    private String forename;
    private String surname;
    private Role role;

    private SessionStatus sessionStatus;

    public SessionStatus getSessionStatus() {
        return sessionStatus;
    }

    public void setSessionStatus(SessionStatus sessionStatus) {
        this.sessionStatus = sessionStatus;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
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

    public Integer getMeetingId() {
        return meetingId;
    }

    public void setMeetingId(Integer meetingId) {
        this.meetingId = meetingId;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MeetingAttendee that = (MeetingAttendee) o;
        return Objects.equals(meetingId, that.meetingId) &&
                Objects.equals(userId, that.userId) &&
                Objects.equals(email, that.email) &&
                Objects.equals(forename, that.forename) &&
                Objects.equals(surname, that.surname) &&
                role == that.role &&
                sessionStatus == that.sessionStatus;
    }

    @Override
    public int hashCode() {
        return Objects.hash(meetingId, userId, email, forename, surname, role, sessionStatus);
    }
}
