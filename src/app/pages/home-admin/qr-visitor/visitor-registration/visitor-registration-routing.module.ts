import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorRegistrationPage } from './visitor-registration.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorRegistrationPageRoutingModule {}
