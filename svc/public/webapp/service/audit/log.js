// Using injector to locate services to avoid circular dependency on load for $http
angular.module("clarus").decorator("$log", ["$delegate", "$injector", function ($delegate, $injector) {
    var log = $delegate.log;
    var info = $delegate.info;
    var debug = $delegate.debug;
    var warn = $delegate.warn;
    var error = $delegate.error;
    var level = {
        SEVERE: "SEVERE",
        ERROR: "ERROR",
        WARN: "WARNING"
    };
    var auditEnabled = false;
    var logToServer = function (level, message) {
        if (auditEnabled) {
            $injector.get("dal").http.POST("audit/", {
                level: level,
                message: message
            });
        }
    };

    $delegate.enableAudit = function () {
        auditEnabled = true;
    };

    $delegate.disableAudit = function () {
        auditEnabled = false;
    };

    $delegate.log = function (message) {
        log("[LOG] " + message);
    };

    $delegate.info = function (message) {
        info("[INFO] " + message);
    };

    $delegate.warn = function (message) {
        warn("[WARN] " + message);
        logToServer(level.WARN, message);
    };

    $delegate.error = function (message) {
        error("[ERROR] " + message);
        logToServer(level.ERROR, message);
    };

    $delegate.severe = function (message) {
        error("[SEVERE] " + message);
        logToServer(level.SEVERE, message);
    };

    $delegate.debug = function (message) {
        debug("[DEBUG] " + message);
    };

    $delegate.info("Audit: added logging");
    return $delegate;
}]);