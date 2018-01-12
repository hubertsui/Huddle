﻿import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
    selector: 'show-errors',
    template: `
    <ul *ngIf="showErrors()" class="error-ul">
      <li style="color: red" *ngFor="let error of listOfErrors()">{{error}}</li>
    </ul>
  `,
})
export class ValidateComponent {

    private static readonly errorMessages = {
        'required': () => 'This field is required',
        'pattern': () => 'This field must be a valid number'
    };

    @Input()
    private control: AbstractControlDirective | AbstractControl;

    showErrors(): boolean {
        return this.control &&
            this.control.errors &&
            (this.control.dirty || this.control.touched);
    }

    listOfErrors(): string[] {
        return Object.keys(this.control.errors)
            .map(field => this.getMessage(field, this.control.errors[field]));
    }

    private getMessage(type: string, params: any) {
        return ValidateComponent.errorMessages[type](params);
    }

}
