package uk.org.langstone.clarus.domain.service.project;

import play.Logger;
import uk.org.langstone.clarus.domain.model.project.Project;
import uk.org.langstone.clarus.domain.model.project.ProjectRepository;
import uk.org.langstone.clarus.domain.service.ServiceResult;

import javax.inject.Inject;

public class DeleteProjectOperation {
    private static final Logger.ALogger LOG = Logger.of(CreateProjectOperation.class);

    private final ProjectRepository repository;

    @Inject
    public DeleteProjectOperation(ProjectRepository repository) {
        this.repository = repository;
    }

    public ServiceResult execute(Integer id) {
        final Project project = repository.get(id);

        repository.remove(project);

        return new ServiceResult("Deleted Project with id" + id);
    }
}
