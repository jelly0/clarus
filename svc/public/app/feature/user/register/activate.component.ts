import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {Route} from "app/feature/user/user.component";

@Component({
    templateUrl: "app/feature/user/register/activate.html",
    styleUrls: ["app/feature/user/register/activate.css"]
})

export class Activate {
    constructor(private router:Router) {
    }

    navigateToLogin(event:any) {
        this.router.navigate([Route.LOGIN]);
    }
}