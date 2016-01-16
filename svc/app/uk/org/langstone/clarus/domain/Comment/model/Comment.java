package uk.org.langstone.clarus.domain.comment.model;

import uk.org.langstone.clarus.domain.meeting.model.MeetingAttendee;

import java.util.Date;
import java.util.List;
import java.util.Objects;

public class Comment {

    private Integer id;
    private Date entryDate;
    private Integer meetingId;
    private Integer parentCommentId;
    private String text;
    private String reference;
    private MeetingAttendee user;

    private List<Comment> replies;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(Date entryDate) {
        this.entryDate = entryDate;
    }

    public Integer getMeetingId() {
        return meetingId;
    }

    public void setMeetingId(Integer meetingId) {
        this.meetingId = meetingId;
    }

    public Integer getParentCommentId() {
        return parentCommentId;
    }

    public void setParentCommentId(Integer parentCommentId) {
        this.parentCommentId = parentCommentId;
    }

    public MeetingAttendee getUser() {
        return user;
    }

    public void setUser(MeetingAttendee user) {
        this.user = user;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public List<Comment> getReplies() {
        return replies;
    }

    public void setReplies(List<Comment> replies) {
        this.replies = replies;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Comment comment = (Comment) o;
        return Objects.equals(id, comment.id) &&
                Objects.equals(entryDate, comment.entryDate) &&
                Objects.equals(meetingId, comment.meetingId) &&
                Objects.equals(parentCommentId, comment.parentCommentId) &&
                Objects.equals(user, comment.user) &&
                Objects.equals(text, comment.text) &&
                Objects.equals(reference, comment.reference);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, entryDate, meetingId, parentCommentId, user, text, reference);
    }
}
