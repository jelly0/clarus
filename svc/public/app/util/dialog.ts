import {Injectable} from "angular2/core";
import BootstrapDialog from "bootstrapDialog";

export class Dialog {
    static waiting(waitMessage: string = "Please Wait") {
        return BootstrapDialog.show({
            message: `<div><i class='fa fa-spinner fa-spin fa-3x'></i>${waitMessage}</div>`,
            closable: false
        });
    }

    static success(successMessage: string, closeAction?: any) {
        return BootstrapDialog.show({
            message: `<div><i class='fa fa-check fa-3x'></i>${successMessage}</div>`,
            closable: false,
            type: BootstrapDialog.TYPE_SUCCESS,
            buttons: [{
                id: 'button-close',
                label: 'OK',
                action: function (dialogWindow: any) {
                    dialogWindow.close();
                    if (closeAction) {
                        closeAction();
                    }
                }
            }]
        });
    }

    static error(errorMessage: string = "An error has occurred - please try again later") {
        return BootstrapDialog.alert({
            title: "Error",
            message: `<div><i class='fa fa-exclamation-circle fa-3x'></i>${errorMessage}</div>`,
            closable: false,
            type: BootstrapDialog.TYPE_DANGER
        })
    }

    static confirm(confirmMessage: string, confirmedCallback?: any, buttonLabel: string = "OK") {
        return BootstrapDialog.confirm({
            message: `<div><i class='fa fa-warning fa-3x'></i>${confirmMessage}</div>`,
            type: BootstrapDialog.TYPE_WARNING,
            closable: false,
            btnOKLabel: buttonLabel,
            btnOKClass: 'btn-warning',
            callback: function (confirmed: boolean) {
                if (confirmed) {
                    confirmedCallback();
                }
            }
        });
    }
}
