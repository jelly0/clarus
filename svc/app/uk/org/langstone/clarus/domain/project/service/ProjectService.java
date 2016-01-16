package uk.org.langstone.clarus.domain.project.service;

import com.fasterxml.jackson.databind.JsonNode;
import uk.org.langstone.clarus.domain.ServiceResult;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class ProjectService {
    private final CreateProjectOperation createProjectOperation;
    private final ListProjectsOperation listProjectsOperation;
    private final UpdateProjectOperation updateProjectOperation;
    private final DeleteProjectOperation deleteProjectOperation;
    private final FindProjectOperation findProjectOperation;
    private final ListIssueOperation listIssueOperation;
    private final CreateIssueOperation createIssueOperation;
    private final UpdateIssueOperation updateIssueOperation;

    @Inject
    public ProjectService(CreateProjectOperation createProjectOperation,
                          ListProjectsOperation listProjectsOperation,
                          UpdateProjectOperation updateProjectOperation,
                          DeleteProjectOperation deleteProjectOperation,
                          FindProjectOperation findProjectOperation,
                          ListIssueOperation listIssueOperation,
                          CreateIssueOperation createIssueOperation,
                          UpdateIssueOperation updateIssueOperation) {

        this.createProjectOperation = createProjectOperation;
        this.listProjectsOperation = listProjectsOperation;
        this.updateProjectOperation = updateProjectOperation;
        this.deleteProjectOperation = deleteProjectOperation;
        this.findProjectOperation = findProjectOperation;

        this.listIssueOperation = listIssueOperation;
        this.createIssueOperation = createIssueOperation;
        this.updateIssueOperation = updateIssueOperation;
    }

    public ServiceResult list() {
        return listProjectsOperation.execute();
    }

    public ServiceResult create(JsonNode jsonResource) {
        return createProjectOperation.execute(jsonResource);
    }

    public ServiceResult update(JsonNode jsonResource) {
        return updateProjectOperation.execute(jsonResource);
    }

    public ServiceResult delete(Integer projectId) {
        return deleteProjectOperation.execute(projectId);
    }

    public ServiceResult find(Integer projectId) {
        return findProjectOperation.execute(projectId);
    }


    public ServiceResult listIssue(final Integer projectId) {
        return listIssueOperation.execute(projectId);
    }

    public ServiceResult createIssue(final Integer projectId) {
        return createIssueOperation.execute(projectId);
    }

    public ServiceResult updateIssue(final Integer projectId) {
        return updateIssueOperation.execute(projectId);
    }
}
