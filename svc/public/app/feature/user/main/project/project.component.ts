import {Component, Input} from "angular2/core";
import {RouteConfig, Router, AuxRoute, ROUTER_DIRECTIVES} from "angular2/router";
import {ProjectList} from "app/feature/user/main/project/project-list.component";
import {ProjectMenu} from "app/feature/user/main/project/project-menu.component";

@Component({
    templateUrl: "app/feature/user/main/project/project.html",
    styleUrls: ["app/feature/user/main/project/project.css"],
    directives: [ROUTER_DIRECTIVES, ProjectMenu]
})

@RouteConfig([
    {path: '/', name: 'ProjectList', component: ProjectList, useAsDefault: true}
])
export class Project {
}