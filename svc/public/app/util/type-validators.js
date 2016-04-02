System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TypeValidators;
    return {
        setters:[],
        execute: function() {
            TypeValidators = (function () {
                function TypeValidators() {
                }
                TypeValidators.email = function (control) {
                    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
                    if (!EMAIL_REGEXP.test(control.value)) {
                        return { "email": true };
                    }
                    else {
                        return null;
                    }
                };
                return TypeValidators;
            }());
            exports_1("TypeValidators", TypeValidators);
        }
    }
});
//# sourceMappingURL=type-validators.js.map