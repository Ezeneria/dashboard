import {Component, forwardRef, Input, OnInit} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }]
})

export class SelectComponent {
  @Input() id = 'select';
  @Input() options: [string];
  @Input() selectedOption: string;

  public form: FormGroup;
  public select: string;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      animationType: [this],
    });
  }

  reset() {
    this.form.reset();
  }

  // selectionChanged(event) {
  //   this.selectionChange.emit(new MatSelectChange(this.matSelect, event.value));
  //   this.valueChange.emit(event.value);
  //   this.onChange(event.value);
  //   this.onTouched();
  // }
  //
  // onChange: any = () => { };
  // onTouched: any = () => { };
  //
  // registerOnChange(fn: any) {
  //   this.onChange = fn;
  // }
  //
  // registerOnTouched(fn: any) {
  //   this.onTouched = fn;
  // }
  //
  // writeValue(value: any) {
  //   this.select = value;
  // }
  //
  // setDisabledState(isDisabled: boolean) {
  //   //this.disabled = isDisabled;
  // }
}
