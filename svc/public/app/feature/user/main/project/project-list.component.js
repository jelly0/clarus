System.register(["angular2/core", "app/service/repository/project.repository", "app/util/dialog"], function(exports_1, context_1) {
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
    var core_1, project_repository_1, dialog_1;
    var ProjectList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (project_repository_1_1) {
                project_repository_1 = project_repository_1_1;
            },
            function (dialog_1_1) {
                dialog_1 = dialog_1_1;
            }],
        execute: function() {
            ProjectList = (function () {
                function ProjectList(projectRepository) {
                    var _this = this;
                    this.projectRepository = projectRepository;
                    projectRepository.getUserProjects().subscribe(function (userProjects) {
                        _this.projects = userProjects;
                    }, function (error) {
                        dialog_1.Dialog.error("Unable to load your projects.  Please try again later");
                    });
                }
                ProjectList = __decorate([
                    core_1.Component({
                        templateUrl: "app/feature/user/main/project/project-list.html"
                    }), 
                    __metadata('design:paramtypes', [project_repository_1.ProjectRepository])
                ], ProjectList);
                return ProjectList;
            }());
            exports_1("ProjectList", ProjectList);
        }
    }
});
//# sourceMappingURL=project-list.component.js.map