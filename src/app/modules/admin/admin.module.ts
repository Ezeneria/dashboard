import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminService} from './admin.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AdminInterceptor} from '../../core/interceptors/admin.interceptor';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { FormNewTaskComponent } from './components/forms/form-new-task/form-new-task.component';
import { ChangeTaskComponent } from './components/forms/change-task/change-task.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    AdminComponent,
    ChangeTaskComponent,
    FormNewTaskComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DragDropModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminInterceptor,
      multi: true
    },
    AdminService,
  ]
})
export class AdminModule { }
