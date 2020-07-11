import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFormSetComponent } from './custom-form-set.component';
import {COMPONENT_SET, MdDynamicFormsModule} from 'md-dynamic-forms';
import { FormGroupViewComponent } from './components/form-group-view/form-group-view.component';
import { FormControlInputComponent } from './components/form-controls/form-control-input/form-control-input.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormFieldWidgetComponent } from './components/form-field-widget/form-field-widget.component';
import {MatIconModule} from '@angular/material/icon';
import {CUSTOM_COMPONENT_SET} from './model/custom-component-set';



@NgModule({
  declarations: [CustomFormSetComponent, FormGroupViewComponent, FormControlInputComponent, FormFieldWidgetComponent],
  imports: [
    CommonModule,
    MdDynamicFormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    CustomFormSetComponent
  ],
  providers: [
    {provide: COMPONENT_SET, useValue: CUSTOM_COMPONENT_SET}
  ]
})
export class CustomFormSetModule { }
