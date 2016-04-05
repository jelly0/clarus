import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {Response} from "angular2/http";
import {FormBuilder, Validators, Control, ControlGroup, FORM_DIRECTIVES} from "angular2/common";
import {TypeValidators} from "app/util/type-validators";
import {Dialog} from "app/util/dialog";
import {UserRepository} from "app/service/repository/user.repository";
import {Route} from "app/feature/user/user.component";
import {HttpStatus} from "app/service/network/httpstatus";
import {Copyright} from "app/feature/common/copyright.component";

@Component({
    templateUrl: "app/feature/user/register/register.html",
    styleUrls: ["app/feature/user/register/register.css"],
    directives: [Copyright]
})
export class Register {
    private registrationForm:ControlGroup;
    public submitted:boolean = false;

    constructor(formBuilder:FormBuilder,
                private router:Router,
                private userRepository:UserRepository) {
        this.registrationForm = formBuilder.group({
            forename: ["", Validators.required],
            surname: ["", Validators.required],
            termOfUse: ["", Validators.required]
        });

        let username:Control = new Control("", Validators.compose([Validators.required, TypeValidators.email]));
        this.registrationForm.controls["username"] = username;
        this.registrationForm.controls["confirmUsername"] =
            new Control("", Validators.compose([Validators.required,
                function (confirmUsername:Control) {
                    return (confirmUsername.value == username.value) ? null : {"match": true};
                }
            ]));

        let password:Control = new Control("", Validators.compose([Validators.required]));
        this.registrationForm.controls["password"] = password;
        this.registrationForm.controls["confirmPassword"] =
            new Control("", Validators.compose([Validators.required,
                function (confirmPassword:Control) {
                    return (confirmPassword.value == password.value) ? null : {"match": true};
                }
            ]));
    }

    register(event:any) {
        event.preventDefault();
        this.submitted = true;

        if (this.registrationForm.valid) {
            let waiting:any = Dialog.waiting("Please wait while we create your account");
            let registrationDetails:any = {
                email: this.registrationForm.controls.username.value,
                password: this.registrationForm.controls.password.value,
                forename: this.registrationForm.controls.forename.value,
                surname: this.registrationForm.controls.surname.value
            };

            this.userRepository.register(registrationDetails)
                .subscribe(
                    (response:Response) => {
                        waiting.close();
                        Dialog.success("Your account has been created.  Please check your email for activation details");
                        this.router.navigate([Route.LOGIN]);
                    },
                    (error:Response) => {
                        waiting.close();
                        if (error == HttpStatus.BAD_REQUEST) {
                            // The account exists - do not leak information
                            Dialog.error("There is a problem with your registration details");
                        } else {
                            Dialog.error("We are currently unable to create your account.  Please try again later");
                        }
                    }
                );
        }
    }

    showTermsOfUse() {
    }

    cancel() {
        this.router.navigate([Route.LOGIN]);
    }
}