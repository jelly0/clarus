package uk.org.langstone.clarus.domain.service.project;

import play.Logger;
import play.libs.Json;
import uk.org.langstone.clarus.domain.model.project.Project;
import uk.org.langstone.clarus.domain.model.project.ProjectRepository;
import uk.org.langstone.clarus.domain.service.ServiceResult;

import javax.inject.Inject;

public class FindProjectOperation {
    private static final Logger.ALogger LOG = Logger.of(FindProjectOperation.class);

    private final ProjectRepository repository;

    @Inject
    public FindProjectOperation(ProjectRepository repository) {
        this.repository = repository;
    }

    public ServiceResult execute(Integer id) {
        final Project project = repository.get(id);
        return new ServiceResult(Json.toJson(project));
    }
}
