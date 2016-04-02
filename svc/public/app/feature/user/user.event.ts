import {Injectable} from 'angular2/core'
import {Subject}    from 'rxjs/Subject';

import {Log} from "app/util/logger";

@Injectable()
export class UserEvent {
    private _authenticationSource = new Subject<string>();

    public authenticated$ = this._authenticationSource.asObservable();

    authenticated() {
        this._authenticationSource.next();
    }

    register() {
        this._authenticationSource.next("register");
    }

}
