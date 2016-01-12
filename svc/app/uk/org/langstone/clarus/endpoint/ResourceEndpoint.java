package uk.org.langstone.clarus.endpoint;

import play.Logger;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.With;
import uk.org.langstone.clarus.infrastructure.security.authentication.Principal;
import uk.org.langstone.clarus.infrastructure.security.endpoint.SecuredAction;
import uk.org.langstone.clarus.domain.service.ServiceResult;

@With(SecuredAction.class)
public abstract class ResourceEndpoint extends Controller {
    private static final Logger.ALogger LOG = Logger.of(ResourceEndpoint.class);

    /**
     * Helper method for returning the appropriate HTTP response base on the service result.
     *
     * @param serviceResult
     * @return http response
     */
    protected Result response(final ServiceResult serviceResult) {
        if (serviceResult.getStatus() == ServiceResult.Status.SUCCESS) {
            return ok(serviceResult.getResult());
        } else {
            // TODO check other statuses

            return internalServerError();
        }
    }

    protected Principal getUserPrincipal() {
        return (Principal) ctx().args.get(Principal.class.getName());
    }
}
