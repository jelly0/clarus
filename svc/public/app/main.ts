import {bootstrap} from "angular2/platform/browser";
import {Component, provide} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES, LocationStrategy, HashLocationStrategy} from "angular2/router";
import {UserContext} from "app/service/context/user.context";
import {ProjectRepository} from "app/service/repository/project.repository";
import {UserRepository} from "app/service/repository/user.repository";
import {HttpClient} from "app/service/network/httpclient.service";
import {User} from "app/feature/user/user.component";

@Component({
        selector: "app",
        template: "<router-outlet></router-outlet>",
        directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
        {path: '/user/...', name: 'User', component: User, useAsDefault: true}
])
class AppComponent {}

bootstrap(AppComponent,
    [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        HttpClient,
        UserContext,
        ProjectRepository,
        UserRepository,
        provide(LocationStrategy, {useClass: HashLocationStrategy})
    ]);