import {Component} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {Main} from "app/feature/user/main/main.component";
import {Login} from "app/feature/user/login/login.component";
import {Register} from "app/feature/user/register/register.component";
import {Activate} from "app/feature/user/register/activate.component";

export const Route = {
    LOGIN: "Login",
    MAIN: "Main",
    REGISTER: "Register",
    ACTIVATE: "Activate"
};

@Component({
    template: "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/...', name: Route.MAIN, component: Main},
    {path: '/register', name: Route.REGISTER, component: Register},
    {path: '/activate', name: Route.ACTIVATE, component: Activate},
    {path: '/', name: Route.LOGIN, component: Login, useAsDefault: true}
])
export class User {
}