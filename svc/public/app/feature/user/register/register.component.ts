import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {Response} from "angular2/http";
import {FormBuilder, Validators, Control, ControlGroup, FORM_DIRECTIVES} from "angular2/common";
import {TypeValidators} from "app/util/type-validators";

@Component({
    templateUrl: "app/feature/user/register/register.html",
    styleUrls: ["app/feature/user/register/register.css"]
})

export class Register {
    private registrationForm:ControlGroup;

    submitted:boolean = false;

    constructor(formBuilder:FormBuilder,
                private router:Router) {
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
        this.submitted = true;
    }

    showTermsOfUse() {
    }

    cancel() {
    }
}


