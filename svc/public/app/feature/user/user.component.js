System.register(["angular2/core", "angular2/router", "app/feature/user/main/main.component", "app/feature/user/login/login.component", "app/feature/user/register/register.component", "app/feature/user/register/activate.component"], function(exports_1, context_1) {
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
    var core_1, router_1, main_component_1, login_component_1, register_component_1, activate_component_1;
    var Route, User;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (main_component_1_1) {
                main_component_1 = main_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (register_component_1_1) {
                register_component_1 = register_component_1_1;
            },
            function (activate_component_1_1) {
                activate_component_1 = activate_component_1_1;
            }],
        execute: function() {
            exports_1("Route", Route = {
                LOGIN: "Login",
                MAIN: "Main",
                REGISTER: "Register",
                ACTIVATE: "Activate"
            });
            User = (function () {
                function User() {
                }
                User = __decorate([
                    core_1.Component({
                        template: "<router-outlet></router-outlet>",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/...', name: Route.MAIN, component: main_component_1.Main },
                        { path: '/register', name: Route.REGISTER, component: register_component_1.Register },
                        { path: '/activate', name: Route.ACTIVATE, component: activate_component_1.Activate },
                        { path: '/', name: Route.LOGIN, component: login_component_1.Login, useAsDefault: true }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], User);
                return User;
            }());
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.component.js.map