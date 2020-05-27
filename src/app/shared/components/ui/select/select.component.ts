import {Component, forwardRef, Input, OnInit} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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

export class SelectComponent implements ControlValueAccessor {

  @Input() id = 'select';
  @Input() options: [string];
  @Input() public placeholder = 'placeholder';

  public value: string;

  onChange: (e) => void;
  onTouch: () => void;

  registerOnChange(fn){
    this.onChange = fn;
  }

  registerOnTouched(fn: any){
    this.onTouch = fn;
  }

  writeValue(value: string): void {
    this.value = value ? value : '';
  }
}
