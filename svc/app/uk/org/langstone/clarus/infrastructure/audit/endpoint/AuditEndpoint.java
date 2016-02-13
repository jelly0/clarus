package uk.org.langstone.clarus.infrastructure.audit.endpoint;

import com.google.inject.Inject;
import play.db.jpa.Transactional;
import play.mvc.Result;
import uk.org.langstone.clarus.endpoint.ResourceEndpoint;
import uk.org.langstone.clarus.infrastructure.audit.service.AuditService;

public class AuditEndpoint extends ResourceEndpoint {

    private final AuditService auditService;

    @Inject
    public AuditEndpoint(AuditService auditService) {
        this.auditService = auditService;
    }

    @Transactional
    public Result log() {
        return response(auditService.log(request().body().asJson()));
    }

}
