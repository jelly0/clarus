System.register(["angular2/core", "rxjs/Rx", "app/service/network/httpclient.service", "app/service/network/auth.service"], function(exports_1, context_1) {
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
    var core_1, Rx_1, httpclient_service_1, auth_service_1;
    var ProjectRepository;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (httpclient_service_1_1) {
                httpclient_service_1 = httpclient_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            ProjectRepository = (function () {
                function ProjectRepository(http, authService) {
                    this.http = http;
                    this.authService = authService;
                }
                ProjectRepository.prototype.getUserProjects = function (userId) {
                    var _this = this;
                    if (userId === void 0) { userId = this.authService.getUser().id; }
                    if (this.projectsCache) {
                        return Rx_1.Observable.of(this.projectsCache);
                    }
                    else {
                        return this.http.get("user/" + userId + "/project")
                            .map(function (response) {
                            return response.json();
                        })
                            .do(function (projects) {
                            _this.projectsCache = projects;
                        })
                            .catch(function (error) {
                            return Rx_1.Observable.throw(error.status);
                        });
                    }
                };
                ProjectRepository = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [httpclient_service_1.HttpClient, auth_service_1.AuthService])
                ], ProjectRepository);
                return ProjectRepository;
            }());
            exports_1("ProjectRepository", ProjectRepository);
        }
    }
});
//# sourceMappingURL=project.repository.js.map