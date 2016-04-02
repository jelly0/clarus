System.register(["angular2/core", "angular2/http", "rxjs/Rx"], function(exports_1, context_1) {
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
    var core_1, http_1, Rx_1;
    var AuthService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            AuthService = (function () {
                function AuthService(http) {
                    this.http = http;
                    this.credentials = {};
                }
                AuthService.prototype.getUsername = function () {
                    return this.credentials.username;
                };
                AuthService.prototype.getToken = function () {
                    return this.credentials.token;
                };
                AuthService.prototype.getUser = function () {
                    return this.user;
                };
                AuthService.prototype.clearContext = function () {
                    this.credentials = {};
                };
                AuthService.prototype.hasAuthenticated = function () {
                    return !(this.credentials.token == undefined || this.credentials != null);
                };
                AuthService.prototype.login = function (username, password) {
                    var _this = this;
                    var authData = btoa(username + ":" + password);
                    return this.http.get("login/user", {
                        headers: { "Authorization": "Basic " + authData }
                    })
                        .do(function (response) {
                        _this.credentials = {
                            username: username,
                            password: password,
                            token: response.json().authToken
                        };
                        _this.user = response.json().user;
                    })
                        .map(function (response) {
                        response = response.json().user;
                    })
                        .catch(function (error) {
                        return Rx_1.Observable.throw(error.status);
                    });
                };
                AuthService.prototype.logout = function () {
                    this.credentials = {};
                };
                AuthService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
                ], AuthService);
                return AuthService;
                var _a;
            }());
            exports_1("AuthService", AuthService);
        }
    }
});
//# sourceMappingURL=auth.service.js.map