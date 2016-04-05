System.register(["angular2/core", "angular2/router", "app/util/dialog", "app/feature/user/main/home/home.component", "app/feature/user/main/project/project.component", "app/service/context/user.context"], function(exports_1, context_1) {
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
    var core_1, router_1, dialog_1, home_component_1, project_component_1, user_context_1;
    var Main;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (dialog_1_1) {
                dialog_1 = dialog_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (project_component_1_1) {
                project_component_1 = project_component_1_1;
            },
            function (user_context_1_1) {
                user_context_1 = user_context_1_1;
            }],
        execute: function() {
            Main = (function () {
                function Main(router, location, userContext) {
                    this.router = router;
                    this.location = location;
                    this.userContext = userContext;
                }
                Main.prototype.logout = function () {
                    var userContext = this.userContext;
                    var router = this.router;
                    dialog_1.Dialog.confirm("Are you sure that you want to logout?", function () {
                        userContext.logout();
                        router.navigate(["Login"]);
                    });
                };
                Main.prototype.navigateToHome = function () {
                    this.router.navigate(["Home"]);
                };
                Main.prototype.navigateToProjects = function () {
                    this.router.navigate(["Project"]);
                };
                Main.prototype.isAtHome = function () {
                    return this.location.path() == "/user/home";
                };
                Main.prototype.isAtProject = function () {
                    return this.location.path().indexOf("/user/project") > -1;
                };
                Main = __decorate([
                    core_1.Component({
                        selector: "user",
                        templateUrl: "app/feature/user/main/main.html",
                        styleUrls: ["app/feature/user/main/main.css"],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: "/home", name: "Home", component: home_component_1.Home },
                        { path: "/project/...", name: "Project", component: project_component_1.Project, useAsDefault: true }
                    ]), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Location !== 'undefined' && router_1.Location) === 'function' && _b) || Object, user_context_1.UserContext])
                ], Main);
                return Main;
                var _a, _b;
            }());
            exports_1("Main", Main);
        }
    }
});
//# sourceMappingURL=main.component.js.map