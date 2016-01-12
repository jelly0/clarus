package uk.org.langstone.clarus.domain.service.user;

import play.Logger;
import play.libs.Json;
import uk.org.langstone.clarus.domain.model.user.User;
import uk.org.langstone.clarus.domain.model.user.UserRepository;
import uk.org.langstone.clarus.domain.service.ServiceResult;

import javax.inject.Inject;

public class FindUserByIdOperation {
    private static final Logger.ALogger LOG = Logger.of(FindUserByIdOperation.class);

    private final UserRepository repository;

    @Inject
    public FindUserByIdOperation(UserRepository repository) {
        this.repository = repository;
    }

    public ServiceResult execute(final Integer id) {
        final User user = repository.get(id);
        return new ServiceResult(Json.toJson(user));
    }
}
