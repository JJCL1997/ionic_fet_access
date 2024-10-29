import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeVigilantPage } from './home-vigilant.page';

const routes: Routes = [
  {
    path: '',
    component: HomeVigilantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeVigilantPageRoutingModule {}
