import {Injectable, Component} from "angular2/core";
import {Http, Response} from "angular2/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthService {
    private credentials:any = {};
    private user:any;

    constructor(private http:Http) {
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

    clearContext() {
        this.credentials = {};
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
                response = response.json().user
            })
            .catch((error:Response) => {
                return Observable.throw(error.status);
            });
    }

    logout() {
        this.credentials = {};
    }
}