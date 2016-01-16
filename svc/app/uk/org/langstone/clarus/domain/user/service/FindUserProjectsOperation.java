package uk.org.langstone.clarus.domain.user.service;

import play.Logger;
import play.libs.Json;
import uk.org.langstone.clarus.domain.project.model.Project;
import uk.org.langstone.clarus.domain.user.UserRepository;
import uk.org.langstone.clarus.domain.ServiceResult;

import javax.inject.Inject;
import java.util.List;

public class FindUserProjectsOperation {
    private static final Logger.ALogger LOG = Logger.of(FindUserProjectsOperation.class);

    private final UserRepository repository;

    @Inject
    public FindUserProjectsOperation(UserRepository repository) {
        this.repository = repository;
    }

    public ServiceResult execute(final Integer userId) {
        final List<Project> projects = repository.findProjectsForUser(userId);
        return new ServiceResult(Json.toJson(projects));
    }
}
