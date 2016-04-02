import { Component } from 'angular2/core';

@Component({
    selector: "project-menu",
    template: `
    <div class="pamm sidemenu">
      <ul>
        <li>Manage projects
          <div>Manage your projects</div>
        </li>
        <li>New Top Level Project
          <div>Create a top level project</div>
        </li>
      </ul>
    </div>
  `
})

export class ProjectMenu {
    
    
    constructor () {
    }
    
    gotoProject() {
    // Do something 
    
    }
    
}
