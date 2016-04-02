import {Component, Input} from "angular2/core";
import {RouteConfig, Router, Location, ROUTER_DIRECTIVES} from "angular2/router";

import {Dialog} from "app/util/dialog";
import {Log} from "app/util/logger"

import {Home} from "app/feature/user/main/home/home.component";
import {Project} from "app/feature/user/main/project/project.component";
import {UserEvent} from "app/feature/user/user.event";

@Component({
    selector: "user",
    templateUrl: "app/feature/user/main/main.html",
    styleUrls: ["app/feature/user/main/main.css"],
    directives: [ROUTER_DIRECTIVES],
    providers: [UserEvent]
})
@RouteConfig([
    {path: "/home", name: "Home", component: Home},
    {path: "/project/...", name: "Project", component: Project, useAsDefault: true}
])
export class Main {
    constructor(private router:Router,
                private dialog:Dialog,
                private location:Location) {
    }

    logout() {
        this.dialog.confirm("Are you sure that you want to logout?", function () {
                Log.debug("logged out");
            }
        );
    }

    navigateToHome() {
        this.router.navigate(["Home"]);
    }

    navigateToProjects() {
        this.router.navigate(["Project"]);
    }

    isAtHome() {
        return this.location.path() == "/user/home";
    }

    isAtProject() {
        return this.location.path() == "/user/project";
    }
}