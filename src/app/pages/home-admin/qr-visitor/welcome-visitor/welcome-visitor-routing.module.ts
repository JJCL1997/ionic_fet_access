import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeVisitorPage } from './welcome-visitor.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomeVisitorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeVisitorPageRoutingModule {}
