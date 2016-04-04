System.register(["angular2/core", "angular2/http", "rxjs/Rx", "angular2/router"], function(exports_1, context_1) {
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
    var core_1, http_1, Rx_1, router_1;
    var UserContext;
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
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            UserContext = (function () {
                function UserContext(http, router) {
                    this.http = http;
                    this.router = router;
                    this.credentials = {};
                    router.subscribe(function (event) {
                        console.log("********");
                        console.log(event);
                    });
                }
                UserContext.prototype.getUsername = function () {
                    return this.credentials.username;
                };
                UserContext.prototype.getToken = function () {
                    return this.credentials.token;
                };
                UserContext.prototype.getUser = function () {
                    return this.user;
                };
                UserContext.prototype.hasAuthenticated = function () {
                    return !(this.credentials.token == undefined || this.credentials != null);
                };
                UserContext.prototype.login = function (username, password) {
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
                        return response.json().user;
                    })
                        .catch(function (error) {
                        return Rx_1.Observable.throw(error.status);
                    });
                };
                UserContext.prototype.logout = function () {
                    this.credentials = {};
                };
                UserContext = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
                ], UserContext);
                return UserContext;
                var _a, _b;
            }());
            exports_1("UserContext", UserContext);
        }
    }
});
//# sourceMappingURL=user.context.js.map