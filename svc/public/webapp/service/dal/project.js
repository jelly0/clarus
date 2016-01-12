"use strict";

angular.module("dal").run(["dal", "$log", function (dal, $log) {

    dal.register($$dal.PROJECT,
        {
            getUserProjects: function(userId) {
                return dal.http.GET("user/" + userId + "/project");
            },
            saveProject : function (projectToSave) {
                return dal.http.POST("project", projectToSave);
            },
            updateProject : function (projectToUpdate) {
                return dal.http.PUT("project", projectToUpdate);
            }
        });

    $log.debug("$$dal:ProjectDAO Instantiated");
}]);
