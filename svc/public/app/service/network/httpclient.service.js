System.register(["angular2/core", "angular2/http", "app/service/context/user.context"], function(exports_1, context_1) {
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
    var core_1, http_1, user_context_1;
    var HttpClient;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (user_context_1_1) {
                user_context_1 = user_context_1_1;
            }],
        execute: function() {
            HttpClient = (function () {
                function HttpClient(http, userContext) {
                    this.http = http;
                    this.userContext = userContext;
                }
                HttpClient.prototype.constructHeaders = function () {
                    var headers = new http_1.Headers();
                    headers.append("Authorization", "Bearer " + this.userContext.getToken());
                    return headers;
                };
                HttpClient.prototype.get = function (url) {
                    return this.http.get(url, {
                        headers: this.constructHeaders()
                    });
                };
                HttpClient.prototype.post = function (url, data) {
                    var headers = this.constructHeaders();
                    headers.append("Accept", "application/json, text/plain, */*");
                    headers.append("Content-Type", "application/json;charset=UTF-8");
                    return this.http.post(url, data, {
                        headers: headers
                    });
                };
                HttpClient.prototype.put = function (url, data) {
                    var headers = this.constructHeaders();
                    headers.append("Accept", "application/json, text/plain, */*");
                    headers.append("Content-Type", "application/json;charset=UTF-8");
                    return this.http.post(url, data, {
                        headers: headers
                    });
                };
                HttpClient = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, user_context_1.UserContext])
                ], HttpClient);
                return HttpClient;
                var _a;
            }());
            exports_1("HttpClient", HttpClient);
        }
    }
});
//# sourceMappingURL=httpclient.service.js.map