package uk.org.langstone.clarus.endpoint;

import play.Logger;
import play.db.jpa.Transactional;
import play.mvc.Result;
import uk.org.langstone.clarus.domain.user.service.UserService;

import javax.inject.Inject;

public class UserEndpoint extends ResourceEndpoint {
    private static final Logger.ALogger LOG = Logger.of(UserEndpoint.class);

    private final UserService userService;

    @Inject
    public UserEndpoint(UserService userService) {
        this.userService = userService;
    }

    @Transactional
    public Result findProjects(final Integer userId) {
        return response(userService.findProjects(userId));
    }
}
