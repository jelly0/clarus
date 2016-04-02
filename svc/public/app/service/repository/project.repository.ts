import {Injectable} from "angular2/core";
import {Response} from "angular2/http";
import {Observable} from "rxjs/Rx";
import {HttpClient} from "app/service/network/httpclient.service";
import {AuthService} from "app/service/network/auth.service";

@Injectable()
export class ProjectRepository {
    private projectsCache:Object[];

    constructor(private http:HttpClient,
                private authService:AuthService) {
    }

    getUserProjects(userId:string = this.authService.getUser().id) {
        if (this.projectsCache) {
            return Observable.of(this.projectsCache);
        } else {
            return this.http.get(`user/${userId}/project`)
                .map((response:Response) => {
                    return response.json();
                })
                .do((projects:Object[]) => {
                    this.projectsCache = projects;
                })
                .catch((error:Response) => {
                    return Observable.throw(error.status);
                });
        }
    }
}
