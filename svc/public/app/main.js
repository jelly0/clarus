System.register(["angular2/platform/browser", "angular2/core", "angular2/http", "angular2/router", "app/service/context/user.context", "app/service/repository/project.repository", "app/service/repository/user.repository", "app/service/network/httpclient.service", "app/feature/user/user.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, core_1, http_1, router_1, user_context_1, project_repository_1, user_repository_1, httpclient_service_1, user_component_1;
    var AppComponent;
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
            function (user_context_1_1) {
                user_context_1 = user_context_1_1;
            },
            function (project_repository_1_1) {
                project_repository_1 = project_repository_1_1;
            },
            function (user_repository_1_1) {
                user_repository_1 = user_repository_1_1;
            },
            function (httpclient_service_1_1) {
                httpclient_service_1 = httpclient_service_1_1;
            },
            function (user_component_1_1) {
                user_component_1 = user_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: "app",
                        template: "<router-outlet></router-outlet>",
                        directives: [router_1.ROUTER_DIRECTIVES],
                    }),
                    router_1.RouteConfig([
                        { path: '/user/...', name: 'User', component: user_component_1.User, useAsDefault: true }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            browser_1.bootstrap(AppComponent, [
                http_1.HTTP_PROVIDERS,
                router_1.ROUTER_PROVIDERS,
                httpclient_service_1.HttpClient,
                user_context_1.UserContext,
                project_repository_1.ProjectRepository,
                user_repository_1.UserRepository,
                core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })
            ]);
        }
    }
});
//# sourceMappingURL=main.js.map