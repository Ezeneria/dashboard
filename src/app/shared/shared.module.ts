import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ChartComponent } from './components/chart/chart.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterSearchComponent } from './components/filter-search/filter-search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InputComponent } from './components/ui/input/input.component';
import { SelectComponent } from './components/ui/select/select.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    ListComponent,
    FilterPipe,
    ChartComponent,
    DialogComponent,
    FilterSearchComponent,
    InputComponent,
    SelectComponent,
    PaginationComponent
  ],
  exports: [
    ListComponent,
    FilterPipe,
    FilterSearchComponent,
    InputComponent,
    SelectComponent,
    ChartComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  entryComponents: [
    DialogComponent,
  ]
})
export class SharedModule { }
