"use strict";
var $$require = (function required() {
    var getURL = function(script) {
        var path= script.src.split('?')[0]; // remove any query parameters
        return path.split('/').slice(0, -1).join('/')+'/';
    };

    return {
        less: function (resoure) {
            var currentScript = document.currentScript || (function () {
                    var scripts = $("script[src*='_package.js']");
                    return scripts[scripts.length - 1];
                })();

            $("<link/>", {
                rel: "stylesheet/less",
                href: getURL(currentScript) + resoure
            }).appendTo("head");
        },
        script: function (resoure) {
            var currentScript = document.currentScript || (function () {
                    var scripts = $("script[src*='_package.js']");
                    return scripts[scripts.length - 1];
                })();

            $("<script>", {
                src: getURL(currentScript) + resoure
            }).appendTo("head");
        }
    }
})();