package uk.org.langstone.clarus.domain.service.user;

import play.Logger;
import play.libs.Json;
import uk.org.langstone.clarus.domain.model.user.User;
import uk.org.langstone.clarus.domain.model.user.UserRepository;
import uk.org.langstone.clarus.domain.service.ServiceResult;

import javax.inject.Inject;
import java.util.List;

public class ListUsersOperation {
    private static final Logger.ALogger LOG = Logger.of(ListUsersOperation.class);

    private final UserRepository repository;

    @Inject
    public ListUsersOperation(UserRepository repository) {
        this.repository = repository;
    }

    public ServiceResult execute() {
        final List<User> users = repository.getAll();
        return new ServiceResult(Json.toJson(users));
    }
}
