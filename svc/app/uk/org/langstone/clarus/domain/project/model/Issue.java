package uk.org.langstone.clarus.domain.project.model;

import java.util.Date;
import java.util.Objects;

public class Issue {
    public enum Status {OPENED, RESOLVED, DEFERRED, CLOSED}

    private Integer id;
    private String text;
    private Date entryDate;
    private Integer user_id;
    private Status status;

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

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Issue issue = (Issue) o;
        return Objects.equals(id, issue.id) &&
                Objects.equals(text, issue.text) &&
                Objects.equals(entryDate, issue.entryDate) &&
                Objects.equals(user_id, issue.user_id) &&
                status == issue.status;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, text, entryDate, user_id, status);
    }
}
