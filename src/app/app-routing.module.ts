
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';

const routes: Routes = [
  // Fallback when no prior route is matched

    {
      path: 'admin',
      loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'login',
      loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    },
    { path: '**', redirectTo: '/admin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
