"use strict";

var $$loader = {

    less: function(path) {
        $("<link/>", {
            rel: "stylesheet/less",
            href: path
        }).appendTo("head");
    },
    script: function(path) {
        $.getScript(path);
    }
};