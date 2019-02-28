import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { mixinModalForm } from './modal.form';
import { FormControl } from '@angular/forms';

export interface ConfirmDialogData {
    title?: string;
    message: string;
    onOkCallBack?: Function;
   }


export class ConfirmDialogModalBase {
    constructor(public dialog: MatDialogRef<any>) {}
}


@Component({
    selector: 'app-confirm-dialog',
    template: `
        <h5 mat-dialog-title *ngIf="data.title">{{data.title}}</h5>
        <hr>
        <br>
        <mat-dialog-content>{{data.message}}</mat-dialog-content>
        <br>       
        <mat-dialog-actions style="display:flex;justify-content:flex-end">
            <button type="button" (click)="save()" [mat-dialog-close]="true" mat-raised-button>Close</button>
        </mat-dialog-actions>
    `
})
export class ConfirmModalComponent extends mixinModalForm(ConfirmDialogModalBase) implements OnInit{
    constructor(
        public dialog: MatDialogRef<ConfirmModalComponent>,
            @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
    ) {

        super(dialog);

    }

    inputControl = new FormControl();


    ngOnInit() {
        this.initModalForm({
            control: this.inputControl,
            save: () =>
                this.data.onOkCallBack()
           
        });
    }
}
