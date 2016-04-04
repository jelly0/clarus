System.register(["angular2/core", "rxjs/Rx", "app/service/network/httpclient.service"], function(exports_1, context_1) {
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
    var core_1, Rx_1, httpclient_service_1;
    var UserRepository;
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
            }],
        execute: function() {
            UserRepository = (function () {
                function UserRepository(http) {
                    this.http = http;
                }
                UserRepository.prototype.register = function (registrationDetails) {
                    return this.http.post("register/user", JSON.stringify(registrationDetails))
                        .map(function (response) {
                        return response.json();
                    })
                        .catch(function (error) {
                        return Rx_1.Observable.throw(error.status);
                    });
                };
                UserRepository = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [httpclient_service_1.HttpClient])
                ], UserRepository);
                return UserRepository;
            }());
            exports_1("UserRepository", UserRepository);
        }
    }
});
//# sourceMappingURL=user.repository.js.map