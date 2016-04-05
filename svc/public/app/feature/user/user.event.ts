import {Injectable} from 'angular2/core'
import {Subject}    from 'rxjs/Subject';

import {Log} from "app/util/logger";

@Injectable()
export class UserEvent {
    private _authenticationSource = new Subject<string>();

    public Event = {
        AUTHENTICATED : "AUTHENTICATED"
    };

    public authenticated$ = this._authenticationSource.asObservable();

    publish(event:string) {
        this._authenticationSource.next();
    }
}
