import { Observable, Subject } from 'rxjs';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { AbstractControl } from '@angular/forms/src/model';
import { filter, switchMap } from 'rxjs/operators';
import { Constructor } from '@angular/material/typings/core/common-behaviors/constructor';

export interface ModalFormConfig<T> {
    control: AbstractControl;
    save: () => Observable<T>;
    action?: string;
    onAction?: () => void;
}

interface ModalFormSource {
    dialog: MatDialogRef<any>;
    }

export interface ModalForm {
    initModalForm: (config: ModalFormConfig<any>) => void;
    saving: boolean;
    save: () => void;
}

export function mixinModalForm<T extends Constructor<ModalFormSource>>(base: T): Constructor<ModalForm> & T {
    return class extends base {
        private _saving = false;
        private _save$ = new Subject<any>();
        private _config: ModalFormConfig<any>;

        constructor(...args: any[]) {
            super(...args);
        }

        initModalForm(config: ModalFormConfig<any>) {

            this._config = config;
            this._save$
                .subscribe(
                   (() => config.save())
                )
                // clean up save pipeline when modal closes
            this.dialog.afterClosed().subscribe({ next: () => this._save$.complete() });
        }

        save() {
            this._save$.next();            
        }

        cancel() {
            this.dialog.close(false);
        }

        get saving() {
            return this._saving;
        }

        private _handleSuccess() {
            // display saved message and handle any action
            this.dialog.close(true);
            // reset state
            this._saving = false;
        }

    };
}
