System.register(["angular2/platform/browser", "angular2/core", "angular2/http", "angular2/router", "app/service/network/auth.service", "app/util/dialog", "app/service/repository/project.repository", "app/service/network/httpclient.service", "app/app.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, core_1, http_1, router_1, auth_service_1, dialog_1, project_repository_1, httpclient_service_1, app_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (dialog_1_1) {
                dialog_1 = dialog_1_1;
            },
            function (project_repository_1_1) {
                project_repository_1 = project_repository_1_1;
            },
            function (httpclient_service_1_1) {
                httpclient_service_1 = httpclient_service_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [
                http_1.HTTP_PROVIDERS,
                router_1.ROUTER_PROVIDERS,
                httpclient_service_1.HttpClient,
                auth_service_1.AuthService,
                dialog_1.Dialog,
                project_repository_1.ProjectRepository,
                core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })
            ]);
        }
    }
});
//# sourceMappingURL=main.js.map