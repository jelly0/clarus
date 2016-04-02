import {bootstrap} from "angular2/platform/browser";
import {provide} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from "angular2/router";
import {AuthService} from "app/service/network/auth.service";
import {Dialog} from "app/util/dialog";
import {ProjectRepository} from "app/service/repository/project.repository";
import {HttpClient} from "app/service/network/httpclient.service";
import {AppComponent} from "app/app.component";

bootstrap(AppComponent,
    [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        HttpClient,
        AuthService,
        Dialog,
        ProjectRepository,
        provide(LocationStrategy, {useClass: HashLocationStrategy})
    ]);