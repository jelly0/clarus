package uk.org.langstone.clarus.domain.model.project;

import java.util.List;
import java.util.Objects;

public class Project {
    private Integer id;
    private String title;
    private String projectCode;
    private String client;
    private String summary;
    private String status;
    private Integer ownerId;
    private List<ProjectMember> members;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getProjectCode() {
        return projectCode;
    }

    public void setProjectCode(String projectCode) {
        this.projectCode = projectCode;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Integer ownerId) {
        this.ownerId = ownerId;
    }

    public List<ProjectMember> getMembers() {
        return members;
    }

    public void setMembers(List<ProjectMember> members) {
        this.members = members;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project project = (Project) o;
        return Objects.equals(id, project.id) &&
                Objects.equals(title, project.title) &&
                Objects.equals(projectCode, project.projectCode) &&
                Objects.equals(client, project.client) &&
                Objects.equals(summary, project.summary) &&
                Objects.equals(status, project.status) &&
                Objects.equals(ownerId, project.ownerId) &&
                Objects.equals(members, project.members);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, projectCode, client, summary, status, ownerId, members);
    }
}