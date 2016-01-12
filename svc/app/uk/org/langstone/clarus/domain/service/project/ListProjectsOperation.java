package uk.org.langstone.clarus.domain.service.project;

import play.Logger;
import play.libs.Json;
import uk.org.langstone.clarus.domain.model.project.Project;
import uk.org.langstone.clarus.domain.model.project.ProjectRepository;
import uk.org.langstone.clarus.domain.service.ServiceResult;

import javax.inject.Inject;
import java.util.List;

public class ListProjectsOperation {
    private static final Logger.ALogger LOG = Logger.of(ListProjectsOperation.class);

    private final ProjectRepository repository;

    @Inject
    public ListProjectsOperation(ProjectRepository repository) {
        this.repository = repository;
    }

    public ServiceResult execute() {
        final List<Project> projects = repository.getAll();
        return new ServiceResult(Json.toJson(projects));
    }
}
