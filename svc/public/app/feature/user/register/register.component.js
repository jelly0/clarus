System.register(["angular2/core", "angular2/router", "angular2/common", "app/util/type-validators", "app/util/dialog", "app/service/repository/user.repository", "app/feature/user/user.component", "app/service/network/httpstatus", "app/feature/common/copyright.component"], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, type_validators_1, dialog_1, user_repository_1, user_component_1, httpstatus_1, copyright_component_1;
    var Register;
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
            function (dialog_1_1) {
                dialog_1 = dialog_1_1;
            },
            function (user_repository_1_1) {
                user_repository_1 = user_repository_1_1;
            },
            function (user_component_1_1) {
                user_component_1 = user_component_1_1;
            },
            function (httpstatus_1_1) {
                httpstatus_1 = httpstatus_1_1;
            },
            function (copyright_component_1_1) {
                copyright_component_1 = copyright_component_1_1;
            }],
        execute: function() {
            Register = (function () {
                function Register(formBuilder, router, userRepository) {
                    this.router = router;
                    this.userRepository = userRepository;
                    this.submitted = false;
                    this.registrationForm = formBuilder.group({
                        forename: ["", common_1.Validators.required],
                        surname: ["", common_1.Validators.required],
                        termOfUse: ["", common_1.Validators.required]
                    });
                    var username = new common_1.Control("", common_1.Validators.compose([common_1.Validators.required, type_validators_1.TypeValidators.email]));
                    this.registrationForm.controls["username"] = username;
                    this.registrationForm.controls["confirmUsername"] =
                        new common_1.Control("", common_1.Validators.compose([common_1.Validators.required,
                            function (confirmUsername) {
                                return (confirmUsername.value == username.value) ? null : { "match": true };
                            }
                        ]));
                    var password = new common_1.Control("", common_1.Validators.compose([common_1.Validators.required]));
                    this.registrationForm.controls["password"] = password;
                    this.registrationForm.controls["confirmPassword"] =
                        new common_1.Control("", common_1.Validators.compose([common_1.Validators.required,
                            function (confirmPassword) {
                                return (confirmPassword.value == password.value) ? null : { "match": true };
                            }
                        ]));
                }
                Register.prototype.register = function (event) {
                    var _this = this;
                    event.preventDefault();
                    this.submitted = true;
                    if (this.registrationForm.valid) {
                        var waiting_1 = dialog_1.Dialog.waiting("Please wait while we create your account");
                        var registrationDetails = {
                            email: this.registrationForm.controls.username.value,
                            password: this.registrationForm.controls.password.value,
                            forename: this.registrationForm.controls.forename.value,
                            surname: this.registrationForm.controls.surname.value
                        };
                        this.userRepository.register(registrationDetails)
                            .subscribe(function (response) {
                            waiting_1.close();
                            dialog_1.Dialog.success("Your account has been created.  Please check your email for activation details");
                            _this.router.navigate([user_component_1.Route.LOGIN]);
                        }, function (error) {
                            waiting_1.close();
                            if (error == httpstatus_1.HttpStatus.BAD_REQUEST) {
                                dialog_1.Dialog.error("There is a problem with your registration details");
                            }
                            else {
                                dialog_1.Dialog.error("We are currently unable to create your account.  Please try again later");
                            }
                        });
                    }
                };
                Register.prototype.showTermsOfUse = function () {
                };
                Register.prototype.cancel = function () {
                    this.router.navigate([user_component_1.Route.LOGIN]);
                };
                Register = __decorate([
                    core_1.Component({
                        templateUrl: "app/feature/user/register/register.html",
                        styleUrls: ["app/feature/user/register/register.css"],
                        directives: [copyright_component_1.Copyright]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof common_1.FormBuilder !== 'undefined' && common_1.FormBuilder) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, user_repository_1.UserRepository])
                ], Register);
                return Register;
                var _a, _b;
            }());
            exports_1("Register", Register);
        }
    }
});
//# sourceMappingURL=register.component.js.map