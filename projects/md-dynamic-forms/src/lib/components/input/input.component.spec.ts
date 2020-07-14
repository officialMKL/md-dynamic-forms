import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {InputComponent} from './input.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FieldInput} from '../../model/form/control/field-input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

describe('InputComponent', () => {
  let spectator: Spectator<InputComponent>;
  const createComponent = createComponentFactory({
    component: InputComponent,
    imports: [
      NoopAnimationsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
    ]
  });

  beforeEach(() => {
    spectator = createComponent({detectChanges: false});
  });

  it('should create', () => {
    expect(spectator.component).toBeDefined();
  });

  it('should have a aria-label with correct content', () => {
    const field = new FieldInput({name: 'test', inputType: 'text', label: 'This is a Test-Label'});
    const group = new FormGroup({test: new FormControl('')});
    spectator.component.field = field;
    spectator.component.group = group;

    spectator.detectChanges();

    const ariaLabel = spectator.query('input').attributes.getNamedItem('aria-label');
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel.value).toEqual(field.label);
  });

  it('should have set the correct inputType', () => {
    const field = new FieldInput({name: 'test', inputType: 'number', label: 'This is a Test-Label'});
    const group = new FormGroup({test: new FormControl('')});
    spectator.component.field = field;
    spectator.component.group = group;

    spectator.detectChanges();

    const inputType = spectator.query('input').attributes.getNamedItem('type');
    expect(inputType).toBeDefined();
    expect(inputType.value).toEqual(field.inputType);
  });

  it('should have aria-required set to true', () => {
    const field = new FieldInput({
      name: 'test',
      inputType: 'number',
      label: 'This is a Test-Label',
      validations: [{name: 'required', validator: Validators.required, message: 'Required field'}],
    });
    const group = new FormGroup({test: new FormControl('', [Validators.required])});
    spectator.component.field = field;
    spectator.component.group = group;

    spectator.detectChanges();

    const ariaRequired = spectator.query('input').attributes.getNamedItem('aria-required');
    expect(ariaRequired).toBeDefined();
    expect(ariaRequired.value).toEqual('true');
  });
});