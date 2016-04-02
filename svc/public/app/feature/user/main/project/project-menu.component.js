System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var ProjectMenu;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ProjectMenu = (function () {
                function ProjectMenu() {
                }
                ProjectMenu.prototype.gotoProject = function () {
                };
                ProjectMenu = __decorate([
                    core_1.Component({
                        selector: "project-menu",
                        template: "\n    <div class=\"pamm sidemenu\">\n      <ul>\n        <li>Manage projects\n          <div>Manage your projects</div>\n        </li>\n        <li>New Top Level Project\n          <div>Create a top level project</div>\n        </li>\n      </ul>\n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProjectMenu);
                return ProjectMenu;
            }());
            exports_1("ProjectMenu", ProjectMenu);
        }
    }
});
//# sourceMappingURL=project-menu.component.js.map