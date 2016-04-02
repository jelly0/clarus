(function config() {
    System.config({
        packages: {
            "app": {defaultExtension: "js"},
            "lib": {defaultExtension: "js"}
        }
    });

    System.paths["jquery"] = "lib/jquery/jquery.min.js";
    System.paths["bootstrap"] = "lib/bootstrap/js/bootstrap.min.js";
    System.paths["bootstrapDialog"] = "lib/bootstrap3-dialog/js/bootstrap-dialog.min.js";

    System.import('app/main').then(null, console.error.bind(console));
})();