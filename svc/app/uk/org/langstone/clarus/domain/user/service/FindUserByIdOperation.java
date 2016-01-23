package uk.org.langstone.clarus.domain.user.service;

import play.Logger;
import play.libs.Json;
import uk.org.langstone.clarus.dal.user.UserRepository;
import uk.org.langstone.clarus.domain.user.model.User;
import uk.org.langstone.clarus.domain.ServiceResult;

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
