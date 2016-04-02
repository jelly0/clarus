import { Control } from 'angular2/common';

interface ValidationResult {
    [key: string]: boolean;
}

export class TypeValidators {

    static email(control:Control):ValidationResult {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (!EMAIL_REGEXP.test(control.value)) {
            return {"email": true};
        } else {
            return null;
        }
    }
}
