package uk.org.langstone.clarus.endpoint;

import play.db.jpa.Transactional;
import play.mvc.Controller;
import play.mvc.Result;
import uk.org.langstone.clarus.domain.ServiceResult;
import uk.org.langstone.clarus.domain.user.service.UserService;

import javax.inject.Inject;

public class RegisterEndpoint extends Controller {
    private final UserService userService;

    @Inject
    public RegisterEndpoint(UserService userService) {
        this.userService = userService;
    }

    @Transactional
    public Result register() {
        final ServiceResult serviceResult = userService.register(request().body().asJson());

        if (serviceResult.getStatus() == ServiceResult.Status.SUCCESS) {
            return ok(serviceResult.getResult());
        } else if (serviceResult.getStatus() == ServiceResult.Status.OP_ERROR) {
            return badRequest("User Exists");
        } else {
            return internalServerError(serviceResult.getResult().asText());
        }
    }
}
