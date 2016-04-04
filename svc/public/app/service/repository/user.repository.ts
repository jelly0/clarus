import {Injectable} from "angular2/core";
import {Response} from "angular2/http";
import {Observable} from "rxjs/Rx";
import {HttpClient} from "app/service/network/httpclient.service";

@Injectable()
export class UserRepository {

    constructor(private http:HttpClient) {
    }

    register(registrationDetails:Object) {
        return this.http.post("register/user", JSON.stringify(registrationDetails))
            .map((response:Response) => {
                return response.json();
            })
            .catch((error:Response) => {
                return Observable.throw(error.status);
            });
    }
}
