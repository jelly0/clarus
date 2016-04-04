import {Injectable} from "angular2/core";
import {Response} from "angular2/http";
import {Observable} from "rxjs/Rx";
import {HttpClient} from "app/service/network/httpclient.service";
import {UserContext} from "app/service/context/user.context";
@Injectable()
export class ProjectRepository {
    private projectsCache:Object[];

    constructor(private http:HttpClient,
                private userContext:UserContext) {
    }

    getUserProjects(userId:string = this.userContext.getUser().id) {
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
