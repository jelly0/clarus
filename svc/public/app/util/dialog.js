System.register(["bootstrapDialog"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var bootstrapDialog_1;
    var Dialog;
    return {
        setters:[
            function (bootstrapDialog_1_1) {
                bootstrapDialog_1 = bootstrapDialog_1_1;
            }],
        execute: function() {
            Dialog = (function () {
                function Dialog() {
                }
                Dialog.waiting = function (waitMessage) {
                    if (waitMessage === void 0) { waitMessage = "Please Wait"; }
                    return bootstrapDialog_1.default.show({
                        message: "<div><i class='fa fa-spinner fa-spin fa-3x'></i>" + waitMessage + "</div>",
                        closable: false
                    });
                };
                Dialog.success = function (successMessage, closeAction) {
                    return bootstrapDialog_1.default.show({
                        message: "<div><i class='fa fa-check fa-3x'></i>" + successMessage + "</div>",
                        closable: false,
                        type: bootstrapDialog_1.default.TYPE_SUCCESS,
                        buttons: [{
                                id: 'button-close',
                                label: 'OK',
                                action: function (dialogWindow) {
                                    dialogWindow.close();
                                    if (closeAction) {
                                        closeAction();
                                    }
                                }
                            }]
                    });
                };
                Dialog.error = function (errorMessage) {
                    if (errorMessage === void 0) { errorMessage = "An error has occurred - please try again later"; }
                    return bootstrapDialog_1.default.alert({
                        title: "Error",
                        message: "<div><i class='fa fa-exclamation-circle fa-3x'></i>" + errorMessage + "</div>",
                        closable: false,
                        type: bootstrapDialog_1.default.TYPE_DANGER
                    });
                };
                Dialog.confirm = function (confirmMessage, confirmedCallback, buttonLabel) {
                    if (buttonLabel === void 0) { buttonLabel = "OK"; }
                    return bootstrapDialog_1.default.confirm({
                        message: "<div><i class='fa fa-warning fa-3x'></i>" + confirmMessage + "</div>",
                        type: bootstrapDialog_1.default.TYPE_WARNING,
                        closable: false,
                        btnOKLabel: buttonLabel,
                        btnOKClass: 'btn-warning',
                        callback: function (confirmed) {
                            if (confirmed) {
                                confirmedCallback();
                            }
                        }
                    });
                };
                return Dialog;
            }());
            exports_1("Dialog", Dialog);
        }
    }
});
//# sourceMappingURL=dialog.js.map