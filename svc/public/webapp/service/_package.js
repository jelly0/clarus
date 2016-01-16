"use strict";

(function () {
    $.getScript("service/dal/dal.js");
    $.getScript("service/dal/user.js");
    $.getScript("service/dal/project.js");
    $.getScript("service/dal/meeting.js");

    $.getScript("service/repository/project.js");
    $.getScript("service/repository/meeting.js");
    $.getScript("service/repository/comment.js");

    $.getScript("service/context/context-event.js");
    $.getScript("service/context/usercontext.js");

    $.getScript("service/security/bearer-token/auth-service.js");
    $.getScript("service/security/bearer-token/auth-interceptor.js");
})();


