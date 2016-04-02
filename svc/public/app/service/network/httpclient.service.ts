import {Injectable} from "angular2/core";
import {Http, Headers} from "angular2/http";
import {AuthService} from "./auth.service";

@Injectable()
export class HttpClient {
    constructor(private http:Http,
                private authService:AuthService) {
    }

    private constructHeaders() {
        var headers:Headers = new Headers();
        headers.append("Authorization", `Bearer ${this.authService.getToken()}`);
        return headers;
    }

    get(url:string) {
        return this.http.get(url, {
            headers: this.constructHeaders()
        });
    }

    post(url:string, data:any) {
        var headers = this.constructHeaders();
        headers.append("Accept", "application/json, text/plain, */*");
        headers.append("Content-Type", "application/json;charset=UTF-8");
        return this.http.post(url, data, {
            headers: this.constructHeaders()
        });
    }

    put(url:string, data:any) {
        var headers = this.constructHeaders();
        headers.append("Accept", "application/json, text/plain, */*");
        headers.append("Content-Type", "application/json;charset=UTF-8");
        return this.http.post(url, data, {
            headers: this.constructHeaders()
        });
    }

    delete(url:string, data:any) {
        return this.http.post(url, data, {
            headers: this.constructHeaders()
        });
    }
}