import {Injectable, Component} from "angular2/core";
import {Http, Response} from "angular2/http";
import {Observable} from "rxjs/Rx";
import {Router} from "angular2/router";

@Injectable()
export class UserContext {
    private credentials:any = {};
    private user:any;

    constructor(private http:Http,
                private router:Router) {
        router.subscribe((event:any) => {
            console.log("********");
            console.log(event);
        })
    }

    getUsername() {
        return this.credentials.username;
    }

    getToken() {
        return this.credentials.token;
    }

    getUser() {
        return this.user;
    }

    hasAuthenticated() {
        return !(this.credentials.token == undefined || this.credentials != null);
    }

    login(username:string, password:string) {
        var authData = btoa(`${username}:${password}`);

        return this.http.get("login/user",
            {
                headers: {"Authorization": `Basic ${authData}`}
            })
            .do((response:Response) => {
                this.credentials = {
                    username: username,
                    password: password,
                    token: response.json().authToken
                };
                this.user = response.json().user;
            })
            .map((response:Response) => {
                return response.json().user;
            })
            .catch((error:Response) => {
                return Observable.throw(error.status);
            });
    }

    logout() {
        this.credentials = {};
    }
}