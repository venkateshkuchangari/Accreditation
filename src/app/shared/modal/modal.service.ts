import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialogConfig } from '@angular/material/dialog/typings/dialog-config';
import { filter, take } from 'rxjs/operators';
import { ESCAPE } from '@angular/cdk/keycodes';
import { ConfirmModalComponent } from './confirm.modal.component';

/**
 * Modal service
 */
@Injectable()
export class ModalService {
    constructor(private dialog: MatDialog) {}

    /**
     * Opens a modal using specified options in conjunction with application defaults.
     * @param componentOrTemplateRef
     * @param config
     */
    open<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config: MatDialogConfig = {}): MatDialogRef<T> {
        const dialog = this.dialog.open(componentOrTemplateRef, {
            hasBackdrop: true,
            disableClose: true,
            autoFocus:false,
            ...config
        });

        dialog
            .keydownEvents()
            .pipe(
                filter(event => event.keyCode === ESCAPE),
                take(1)
            )
            .subscribe(() => dialog.close());

        return dialog;
    }

    /**
     * Open a confirmation modal using the specified message.  Allows passing in a title, if not specified,
     * it will use 'Are you sure?'.
     *
     * @param message Message to show in body of dialog
     * @param title Title to show at the top
     */
    confirm(message: string, title: string,onOkCallBack?:Function): MatDialogRef<ConfirmModalComponent> {
        return this.open(ConfirmModalComponent, {
            width:"500px",
            data: {
                title,
                message,
               onOkCallBack
            }
        });
    }
}
