"use strict";

angular.module("dal").run(["dal", "$log",
    function (dal, $log) {
        dal.register($$dal.USER,
            {
                register: function (newUser) {
                    return dal.http.POST("register/user", newUser);
                }
            });

        $log.debug("$$dal:UserDAO Instantiated");
    }]);
