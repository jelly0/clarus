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
                    return (EMAIL_REGEXP.test(control.value)) ? null : { "email": true };
                };
                TypeValidators.date = function (control) {
                    var DATE = /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[012])\.(19\d{2})|([2]\d{3})$/;
                    return (DATE.test(control.value)) ? null : { "date": true };
                };
                TypeValidators.postcode = function (control) {
                    var POSTCODE = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/;
                    return (POSTCODE.test(control.value)) ? null : { "postcode": true };
                };
                TypeValidators.niNumber = function (control) {
                    var NI_NUMBER = /^\s*([a-zA-Z]){2}(\s*[0-9]\s*){6}([a-zA-Z]){1}?$/;
                    return (NI_NUMBER.test(control.value)) ? null : { "ni_number": true };
                };
                TypeValidators.phoneNumber = function (control) {
                    var UK_PHONE_NUMBER = /^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|\#)\d{3,4})?$/;
                    return (UK_PHONE_NUMBER.test(control.value)) ? null : { "phone": true };
                };
                return TypeValidators;
            }());
            exports_1("TypeValidators", TypeValidators);
        }
    }
});
//# sourceMappingURL=type-validators.js.map