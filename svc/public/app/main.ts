import {bootstrap} from "angular2/platform/browser";
import {provide} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from "angular2/router";
import {UserContext} from "app/service/context/user.context";
import {Dialog} from "app/util/dialog";
import {ProjectRepository} from "app/service/repository/project.repository";
import {UserRepository} from "app/service/repository/user.repository";
import {HttpClient} from "app/service/network/httpclient.service";
import {AppComponent} from "app/app.component";

bootstrap(AppComponent,
    [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        HttpClient,
        UserContext,
        Dialog,
        ProjectRepository,
        UserRepository,
        provide(LocationStrategy, {useClass: HashLocationStrategy})
    ]);