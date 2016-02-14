"use strict";

angular.module("clarus").directive("uppercase", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attrs, ngModel) {
            var uppercase = function (inputValue) {
                var converted;
                if (inputValue != undefined) {
                    converted = inputValue.toUpperCase();
                    if (converted !== inputValue) {
                        ngModel.$setViewValue(converted);
                        ngModel.$render();
                    }
                }
                return converted;
            };
            ngModel.$parsers.push(uppercase);
            uppercase(scope[attrs.ngModel]);
        }
    };
});