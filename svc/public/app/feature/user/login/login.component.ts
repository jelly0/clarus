import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {Response} from "angular2/http";
import {FormBuilder, Validators, Control, ControlGroup, FORM_DIRECTIVES} from "angular2/common";
import {TypeValidators} from "app/util/type-validators";
import {Log} from "app/util/logger";
import {AuthService} from "app/service/network/auth.service";
import {Dialog} from "app/util/dialog";
import {HTTP_STATUS} from "app/service/network/httpstatus";
import {Route} from "app/feature/user/user.component";

@Component({
    templateUrl: "app/feature/user/login/login.html",
    styleUrls: ["app/feature/user/login/login.css"]
})

export class Login {
    private loginForm:ControlGroup;

    authenticationError:boolean = false;
    submitted:boolean = false;

    constructor(formBuilder:FormBuilder,
                private router: Router,
                private authService:AuthService) {
        this.loginForm = formBuilder.group({
            username: ["", Validators.compose([Validators.required, TypeValidators.email])],
            password: ["", Validators.required]
        });

        Log.info(this.loginForm);
    }

    login(event:any) {
        this.authenticationError = false;
        this.submitted = true;

        event.preventDefault();
        if (this.loginForm.valid) {
            let waiting:any = Dialog.waiting("Logging in - please wait");
            this.authService
                .login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
                .subscribe(
                    (response:Response) => {
                        waiting.close();
                        this.router.navigate([Route.MAIN]);
                    },
                    (error:Response) => {
                        waiting.close();
                        if (error == HTTP_STATUS.UNAUTHORIZED) {
                            this.authenticationError = true;
                        } else {
                            Dialog.error("Unable to login.  Please try again later");
                        }
                    }
                );
        }
    }
}