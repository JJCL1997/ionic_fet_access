import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrVisitorPage } from './qr-visitor.page';

const routes: Routes = [
  {
    path: '',
    component: QrVisitorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrVisitorPageRoutingModule {}
