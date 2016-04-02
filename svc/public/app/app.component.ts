import { Component } from "angular2/core";
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { User } from "app/feature/user/user.component";

@Component({
    selector: "app",
    template: "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES],
})

@RouteConfig([
    {path: '/user/...', name: 'User', component: User, useAsDefault: true}
])

export class AppComponent {
}