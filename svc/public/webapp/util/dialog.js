"use strict";

/**
 * Facade for BootStrapDialog
 */
var $$dialog = {
    waiting: function (waitMessage) {

        if (!!waitMessage) {
            waitMessage = "Please Wait";
        }
        return BootstrapDialog.show({
            message: $("<div><i class='fa fa-spinner fa-spin fa-3x'></i>" + waitMessage + "</div>"),
            closable: false
        });
    },

    success: function (successMessage, closeAction) {
        return BootstrapDialog.show({
            message: $("<div><i class='icon ok large'></i>" + successMessage + "</div>"),
            closable: false,
            type: BootstrapDialog.TYPE_SUCCESS,
            buttons: [{
                id: 'button-close',
                label: 'OK',
                action: function (dialogWindow) {
                    dialogWindow.close();
                    closeAction();
                }
            }]
        });
    },

    error: function (errorMessage) {
        if (!!errorMessage) {
            errorMessage = "An error has occurred - please try again later";
        }
        return BootstrapDialog.alert({
            title: "Error",
            message: $("<div><i class='icon attention large'></i>" + errorMessage + "</div>"),
            closable: false,
            type: BootstrapDialog.TYPE_DANGER
        });
    },

    confirm: function (confirmMessage, buttonLabel, confirmedCallback) {
        return BootstrapDialog.confirm({
            message: $("<div><i class='icon warning large'></i>" + confirmMessage + "</div>"),
            type: BootstrapDialog.TYPE_WARNING,
            closable: false,
            btnOKLabel: buttonLabel,
            btnOKClass: 'btn-warning',
            callback: function (confirmed) {
                if (confirmed) {
                    confirmedCallback();
                }
            }
        })
    }
};
