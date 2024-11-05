import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home-admin',
    loadChildren: () => import('./pages/home-admin/home-admin.module').then(m => m.HomeAdminPageModule),
    canActivate: [AuthGuard], data: { role: 'admin'}
  },
  {
    path: 'admin-users',
    loadChildren: () => import('./pages/home-admin/admin-users/admin-users.module').then(m => m.AdminUsersPageModule),
    canActivate: [AuthGuard], data: { role: 'admin'}
  },
  {
    path: 'view-users',
    loadChildren: () => import('./pages/home-admin/admin-users/view-users/view-users.module').then(m => m.ViewUsersPageModule),
    canActivate: [AuthGuard], data: { role: 'admin'}
  },
  {
    path: 'update-user/:id',
    loadChildren: () => import('./pages/home-admin/admin-users/update-user/update-user.module').then(m => m.UpdateUserPageModule),
    canActivate: [AuthGuard], data: { role: 'admin'}
  },
  {
    path: 'register-user',
    loadChildren: () => import('./pages/home-admin/admin-users/register-user/register-user.module').then(m => m.RegisterUserPageModule),
    canActivate: [AuthGuard], data: { role: 'admin'}
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'generate-qr',
    loadChildren: () => import('./pages/home-student/generate-qr/generate-qr.module').then( m => m.GenerateQrPageModule),
    canActivate: [AuthGuard], data: { role: 'student'}

  },
  {
    path: 'home-student',
    loadChildren: () => import('./pages/home-student/home-student.module').then( m => m.HomeStudentPageModule),
    canActivate: [AuthGuard], data: { role: 'student'}

  },
  {
    path: 'home-vigilant',
    loadChildren: () => import('./pages/home-vigilant/home-vigilant.module').then( m => m.HomeVigilantPageModule),
    canActivate: [AuthGuard], data: { role: 'vigilant'}
  },
  {
    path: 'scan-qr',
    loadChildren: () => import('./pages/scan-qr/scan-qr.module').then( m => m.ScanQrPageModule)
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
