import {Component, Input} from "angular2/core";
import {ProjectRepository} from "app/service/repository/project.repository";
import {Dialog} from "app/util/dialog";

import { Log } from "app/util/logger";

@Component({
    templateUrl: "app/feature/user/main/project/project-list.html"
})

export class ProjectList {
    projects:Object[];

    constructor(private projectRepository:ProjectRepository) {
        projectRepository.getUserProjects().subscribe(
            (userProjects:Object[]) => {
                this.projects = userProjects;
            },
            (error:string) => {
                Dialog.error("Unable to load your projects.  Please try again later");
            });
    }
}