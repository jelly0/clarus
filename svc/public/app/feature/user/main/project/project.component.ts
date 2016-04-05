import {Component, Input} from "angular2/core";
import {RouteConfig, Router, AuxRoute, ROUTER_DIRECTIVES} from "angular2/router";
import {ProjectList} from "app/feature/user/main/project/project-list.component";
import {ProjectMenu} from "app/feature/user/main/project/project-menu.component";
// import {ProjectForm} from "app/feature/user/main/project/project-form.component";

@Component({
    template: `
        <aside class="col-md-3 col-sm-4">
          <router-outlet name="menu"></router-outlet>
        </aside>
        <main class="col-md-9 col-sm-8 col-xs-12 container">
          <router-outlet name="content"></router-outlet>
        </main>
    `,
    styleUrls: ["app/feature/user/main/project/project.css"],
    directives: [ROUTER_DIRECTIVES, ProjectMenu]
})

@RouteConfig([
    {path: "/menu", name: "Menu", component: ProjectMenu, aux: "menu"},
    {path: "/list", name: "List", component: ProjectList, aux: "content"}
    // {path: "/edit", name: "Edit", component: ProjectForm, aux: "content"}
])
export class Project {
    constructor(private router:Router) {
        this.router.navigate(["./",["List"]]);
        this.router.navigate(["./",["Menu"]]);
    }
}
