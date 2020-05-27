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
  @Input() public placeholder = 'placeholder';

  public value;

  onChange: (e) => void;
  onTouch: () => void;


  registerOnChange(fn: any){
    this.onChange = fn;
  }

  registerOnTouched(fn: any){
    this.onTouch = fn;
  }

  writeValue(value: string): void {
    this.value = value ? value : '';
  }
}
