import {Component} from '@angular/core';
import {BaseElement, FieldInput} from 'md-dynamic-forms-core';

@Component({
  selector: 'md-input',
  template: `
      <mat-form-field class="demo-full-width" [formGroup]="group">
        <input matInput [formControlName]="field.name" [placeholder]="field.label" [type]="field.inputType">
        <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
          <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
        </ng-container>
      </mat-form-field>
  `,
  styles: []
})
export class InputComponent extends BaseElement<FieldInput> {
  constructor() {
    super();
  }
}