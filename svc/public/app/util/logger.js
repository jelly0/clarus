System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Log;
    return {
        setters:[],
        execute: function() {
            Log = (function () {
                function Log() {
                }
                Log.log = function (message) {
                    console.log("[LOG] " + message);
                };
                ;
                Log.info = function (message) {
                    console.log("[INFO] " + message);
                };
                ;
                Log.warn = function (message) {
                    console.log("[WARN] " + message);
                };
                ;
                Log.error = function (message) {
                    console.log("[ERROR] " + message);
                };
                ;
                Log.severe = function (message) {
                    console.log("[SEVERE] " + message);
                };
                ;
                Log.debug = function (message) {
                    console.log("[DEBUG] " + message);
                };
                ;
                return Log;
            }());
            exports_1("Log", Log);
        }
    }
});
//# sourceMappingURL=logger.js.map