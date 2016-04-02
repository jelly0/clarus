System.register(["angular2/core", "angular2/router", "angular2/common", "app/util/type-validators", "app/util/logger", "app/service/network/auth.service", "app/util/dialog", "app/service/network/httpstatus", "app/feature/user/user.component"], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, type_validators_1, logger_1, auth_service_1, dialog_1, httpstatus_1, user_component_1;
    var Login;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (type_validators_1_1) {
                type_validators_1 = type_validators_1_1;
            },
            function (logger_1_1) {
                logger_1 = logger_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (dialog_1_1) {
                dialog_1 = dialog_1_1;
            },
            function (httpstatus_1_1) {
                httpstatus_1 = httpstatus_1_1;
            },
            function (user_component_1_1) {
                user_component_1 = user_component_1_1;
            }],
        execute: function() {
            Login = (function () {
                function Login(formBuilder, router, authService) {
                    this.router = router;
                    this.authService = authService;
                    this.authenticationError = false;
                    this.submitted = false;
                    this.loginForm = formBuilder.group({
                        username: ["", common_1.Validators.compose([common_1.Validators.required, type_validators_1.TypeValidators.email])],
                        password: ["", common_1.Validators.required]
                    });
                    logger_1.Log.info(this.loginForm);
                }
                Login.prototype.login = function (event) {
                    var _this = this;
                    this.authenticationError = false;
                    this.submitted = true;
                    event.preventDefault();
                    if (this.loginForm.valid) {
                        var waiting_1 = dialog_1.Dialog.waiting("Logging in - please wait");
                        this.authService
                            .login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
                            .subscribe(function (response) {
                            waiting_1.close();
                            _this.router.navigate([user_component_1.Route.MAIN]);
                        }, function (error) {
                            waiting_1.close();
                            if (error == httpstatus_1.HTTP_STATUS.UNAUTHORIZED) {
                                _this.authenticationError = true;
                            }
                            else {
                                dialog_1.Dialog.error("Unable to login.  Please try again later");
                            }
                        });
                    }
                };
                Login = __decorate([
                    core_1.Component({
                        templateUrl: "app/feature/user/login/login.html",
                        styleUrls: ["app/feature/user/login/login.css"]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof common_1.FormBuilder !== 'undefined' && common_1.FormBuilder) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, auth_service_1.AuthService])
                ], Login);
                return Login;
                var _a, _b;
            }());
            exports_1("Login", Login);
        }
    }
});
//# sourceMappingURL=login.component.js.map