package uk.org.langstone.clarus.dal.jpa.Comment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import uk.org.langstone.clarus.dal.jpa.meeting.MeetingUserEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Table(name = "comment")
@Entity
@NamedQueries({
        @NamedQuery(name = CommentEntity.FIND_ALL_FOR_MEETING, query = "SELECT c FROM CommentEntity c WHERE c.meetingId = :meetingId AND c.parentCommentId IS NULL"),
        @NamedQuery(name = CommentEntity.FIND_BY_ID, query = "SELECT c FROM CommentEntity c WHERE c.id = :commentId"),
})
public class CommentEntity implements Serializable {
    public static final String FIND_ALL_FOR_MEETING = "commentEntity.FIND_ALL_FOR_MEETING";
    public static final String FIND_BY_ID = "commentEntity.FIND_BY_ID";

    public static final String COMMENT_ID_PARAM = "commentId";
    public static final String MEETING_ID_PARAM = "meetingId";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "reference", nullable = false)
    private String reference;

    @Column(name = "entry_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date entryDate;

    @Column(name = "meeting_id", nullable = false)
    private Integer meetingId;

    @Column(name = "parent_comment_id", nullable = false)
    private Integer parentCommentId;

    @Column(name = "meeting_user_id", nullable = false)
    private Integer meetingUserId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "meeting_user_id", referencedColumnName = "id", insertable = false, updatable = false)
    private MeetingUserEntity user;

    @OneToMany
    @JoinColumn(name = "parent_comment_id", insertable = false, updatable = false)
    private List<CommentEntity> replies;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
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

    public void setParentCommentId(Integer commentId) {
        this.parentCommentId = commentId;
    }

    public MeetingUserEntity getUser() {
        return user;
    }

    public void setUser(MeetingUserEntity meetingUser) {
        this.user = meetingUser;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public List<CommentEntity> getReplies() {
        return replies;
    }

    public void setReplies(List<CommentEntity> replies) {
        this.replies = replies;
    }

    public Integer getMeetingUserId() {
        return meetingUserId;
    }

    public void setMeetingUserId(Integer meetingUserId) {
        this.meetingUserId = meetingUserId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CommentEntity that = (CommentEntity) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(text, that.text) &&
                Objects.equals(reference, that.reference) &&
                Objects.equals(entryDate, that.entryDate) &&
                Objects.equals(meetingId, that.meetingId) &&
                Objects.equals(parentCommentId, that.parentCommentId) &&
                Objects.equals(meetingUserId, that.meetingUserId) &&
                Objects.equals(user, that.user) &&
                Objects.equals(replies, that.replies);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, text, reference, entryDate, meetingId, parentCommentId, meetingUserId, user, replies);
    }
}
