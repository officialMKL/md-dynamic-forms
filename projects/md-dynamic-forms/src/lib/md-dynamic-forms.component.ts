import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FieldConfig} from './model/field-config.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'md-dynamic-forms',
  template: `
      <form class="dynamic-form" [formGroup]="form" (submit)="onSubmit($event)">
          <ng-container *ngFor="let field of fields;" mdDynamicField [field]="field" [group]="form">
          </ng-container>
      </form>
  `,
  styles: []
})
export class MdDynamicFormsComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  get value() {
    return this.form.value;
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.createControl();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  createControl() {
    const group = this.fb.group({});
    this.fields.forEach(field => {
      if (field.type === 'button') {
        return;
      }
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );
      group.addControl(field.name, control);
    });
    return group;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({onlySelf: true});
    });
  }

}