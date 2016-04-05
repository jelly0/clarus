System.register(["angular2/core", "angular2/router", "app/feature/user/main/project/project-list.component", "app/feature/user/main/project/project-menu.component"], function(exports_1, context_1) {
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
    var core_1, router_1, project_list_component_1, project_menu_component_1;
    var Project;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (project_list_component_1_1) {
                project_list_component_1 = project_list_component_1_1;
            },
            function (project_menu_component_1_1) {
                project_menu_component_1 = project_menu_component_1_1;
            }],
        execute: function() {
            Project = (function () {
                function Project(router) {
                    this.router = router;
                    this.router.navigate(["./", ["List"]]);
                    this.router.navigate(["./", ["Menu"]]);
                }
                Project = __decorate([
                    core_1.Component({
                        template: "\n        <aside class=\"col-md-3 col-sm-4\">\n          <router-outlet name=\"menu\"></router-outlet>\n        </aside>\n        <main class=\"col-md-9 col-sm-8 col-xs-12 container\">\n          <router-outlet name=\"content\"></router-outlet>\n        </main>\n    ",
                        styleUrls: ["app/feature/user/main/project/project.css"],
                        directives: [router_1.ROUTER_DIRECTIVES, project_menu_component_1.ProjectMenu]
                    }),
                    router_1.RouteConfig([
                        { path: "/menu", name: "Menu", component: project_menu_component_1.ProjectMenu, aux: "menu" },
                        { path: "/list", name: "List", component: project_list_component_1.ProjectList, aux: "content" }
                    ]), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
                ], Project);
                return Project;
                var _a;
            }());
            exports_1("Project", Project);
        }
    }
});
//# sourceMappingURL=project.component.js.map