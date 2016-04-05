import {Component, Input} from "angular2/core";
import {ProjectRepository} from "app/service/repository/project.repository";
import {Dialog} from "app/util/dialog";

import { Log } from "app/util/logger";

@Component({
    templateUrl: "app/feature/user/main/project/project-form.html"
})

export class ProjectForm {
    constructor(private projectRepository:ProjectRepository) {
    }
}