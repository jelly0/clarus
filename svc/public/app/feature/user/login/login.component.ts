import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {Response} from "angular2/http";
import {FormBuilder, Validators, Control, ControlGroup, FORM_DIRECTIVES} from "angular2/common";
import {TypeValidators} from "app/util/type-validators";
import {Dialog} from "app/util/dialog";
import {UserContext} from "app/service/context/user.context";
import {HttpStatus} from "app/service/network/httpstatus";
import {Route} from "app/feature/user/user.component";
import {Copyright} from "app/feature/common/copyright.component";

@Component({
    templateUrl: "app/feature/user/login/login.html",
    styleUrls: ["app/feature/user/login/login.css"],
    directives: [Copyright]
})
export class Login {
    private loginForm:ControlGroup;

    authenticationError:boolean = false;
    submitted:boolean = false;

    constructor(formBuilder:FormBuilder,
                private router:Router,
                private userContext:UserContext) {
        this.loginForm = formBuilder.group({
            username: ["", Validators.compose([Validators.required, TypeValidators.email])],
            password: ["", Validators.required]
        });
    }

    register(event:any) {
        this.router.navigate([Route.REGISTER]);
    }

    login(event:any) {
        this.authenticationError = false;
        this.submitted = true;

        event.preventDefault();
        if (this.loginForm.valid) {
            let waiting:any = Dialog.waiting("Logging in - please wait");
            this.userContext
                .login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
                .subscribe(
                    (response:Response) => {
                        waiting.close();
                        this.router.navigate([Route.MAIN]);
                    },
                    (error:Response) => {
                        waiting.close();
                        if (error == HttpStatus.UNAUTHORIZED) {
                            this.authenticationError = true;
                        } else {
                            Dialog.error("Unable to login.  Please try again later");
                        }
                    }
                );
        }
    }
}