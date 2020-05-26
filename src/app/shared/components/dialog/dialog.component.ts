import {
  AfterViewInit, ChangeDetectorRef,
  Component, ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Inject, OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', {static: true, read: ViewContainerRef}) container;
  componentRef: ComponentRef<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private resolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef
  ) { }

  createComponent() {
    this.container.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(this.data.component);
    this.componentRef = this.container.createComponent(factory);
    const hostedComponent = this.componentRef.instance;

    if (this.data.inputs) {
      Object.keys(this.data.inputs).forEach(inputName => {
        hostedComponent[inputName] = this.data.inputs[inputName];
      });
    }

    Object.keys(hostedComponent)
      .filter(prop => hostedComponent[prop] instanceof EventEmitter)
      .forEach(output => {
        this[output] = new EventEmitter();
        this[`${output}_sub`] = hostedComponent[output].subscribe(data => {
          this[output].emit(data);
        });
      });
  }

  closeModal() {
    this.dialogRef.close();
  }

  ngAfterViewInit(): void {
    this.createComponent();
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }
}
