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
    path: 'visitors',
    loadChildren: () => import('./pages/home-admin/visitors/visitors.module').then( m => m.VisitorsPageModule),
    canActivate: [AuthGuard], data: { role: 'admin'}
  },
  {
    path: 'visitor-details/:id',
    loadChildren: () => import('./pages/home-admin/visitors/visitor-details/visitor-details.module').then( m => m.VisitorDetailsPageModule),
    canActivate: [AuthGuard], data: { role: 'admin'}
  },
  {
    path: 'access-logs',
    loadChildren: () => import('./pages/home-admin/access-logs/access-logs.module').then( m => m.AccessLogsPageModule),
    canActivate: [AuthGuard], data: { role: 'admin'}

  },
  {
    path: 'access-logs-details/:id',
    loadChildren: () => import('./pages/home-admin/access-logs/access-logs-details/access-logs-details.module').then( m => m.AccessLogsDetailsPageModule),
    canActivate: [AuthGuard], data: { role: 'admin'}

  },
  {
    path: 'qr-visitor',
    loadChildren: () => import('./pages/home-admin/qr-visitor/qr-visitor.module').then( m => m.QrVisitorPageModule),
    canActivate: [AuthGuard], data: { role: 'vigilant'}

  },

  {
    path: 'scan-qr',
    loadChildren: () => import('./scan-qr/scan-qr.module').then( m => m.ScanQrPageModule),
    canActivate: [AuthGuard], data: { role: 'vigilant'}

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
    path: 'profile-info',
    loadChildren: () => import('./pages/home-student/profile-info/profile-info.module').then( m => m.ProfileInfoPageModule),
    canActivate: [AuthGuard], data: { role: 'student'}
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/home-student/profile-info/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule),
    canActivate: [AuthGuard], data: { role: 'student'}

  },
  {
    path: 'edit-password',
    loadChildren: () => import('./pages/home-student/profile-info/edit-password/edit-password.module').then( m => m.EditPasswordPageModule),
    canActivate: [AuthGuard], data: { role: 'student'}

  },

  {
    path: 'home-vigilant',
    loadChildren: () => import('./pages/home-vigilant/home-vigilant.module').then( m => m.HomeVigilantPageModule),
    canActivate: [AuthGuard], data: { role: 'vigilant'}

  },
  {
    path: 'visitor-registration',
    loadChildren: () => import('./pages/home-admin/qr-visitor/visitor-registration/visitor-registration.module').then( m => m.VisitorRegistrationPageModule)
  },
  {
    path: 'welcome-visitor',
    loadChildren: () => import('./pages/home-admin/qr-visitor/welcome-visitor/welcome-visitor.module').then( m => m.WelcomeVisitorPageModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
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
