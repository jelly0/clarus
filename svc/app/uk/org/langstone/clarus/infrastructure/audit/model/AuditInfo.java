package uk.org.langstone.clarus.infrastructure.audit.model;

import uk.org.langstone.clarus.infrastructure.audit.service.AuditService;

public class AuditInfo {

    private AuditService.LEVEL level;
    private String message;

    public AuditService.LEVEL getLevel() {
        return level;
    }

    public void setLevel(AuditService.LEVEL level) {
        this.level = level;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
