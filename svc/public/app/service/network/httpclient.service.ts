import {Injectable} from "angular2/core";
import {Http, Headers} from "angular2/http";
import {UserContext} from "app/service/context/user.context";

@Injectable()
export class HttpClient {
    constructor(private http:Http,
                private userContext:UserContext) {
    }

    private constructHeaders() {
        var headers:Headers = new Headers();
        headers.append("Authorization", `Bearer ${this.userContext.getToken()}`);
        return headers;
    }

    get(url:string) {
        return this.http.get(url, {
            headers: this.constructHeaders()
        });
    }

    post(url:string, data:string) {
        var headers = this.constructHeaders();
        headers.append("Accept", "application/json, text/plain, */*");
        headers.append("Content-Type", "application/json;charset=UTF-8");
        return this.http.post(url, data, {
            headers: headers
        });
    }

    put(url:string, data:string) {
        var headers = this.constructHeaders();
        headers.append("Accept", "application/json, text/plain, */*");
        headers.append("Content-Type", "application/json;charset=UTF-8");
        return this.http.post(url, data, {
            headers: headers
        });
    }
}