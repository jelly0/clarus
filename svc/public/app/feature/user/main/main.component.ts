import {Component, ComponentInstruction, Input} from "angular2/core";
import {RouteConfig, Router, Location, ROUTER_DIRECTIVES} from "angular2/router";
import {Dialog} from "app/util/dialog";
import {Log} from "app/util/logger";
import {Home} from "app/feature/user/main/home/home.component";
import {Project} from "app/feature/user/main/project/project.component";
import {UserContext} from "app/service/context/user.context";

@Component({
    selector: "user",
    templateUrl: "app/feature/user/main/main.html",
    styleUrls: ["app/feature/user/main/main.css"],
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: "/home", name: "Home", component: Home},
    {path: "/project/...", name: "Project", component: Project, useAsDefault: true}
])
export class Main {
    constructor(private router:Router,
                private location:Location,
                private userContext:UserContext) {
    }

    logout() {
        Dialog.confirm("Are you sure that you want to logout?", function () {
                this.userContext.logout();
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