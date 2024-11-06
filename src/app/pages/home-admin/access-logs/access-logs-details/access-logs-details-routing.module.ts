import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessLogsDetailsPage } from './access-logs-details.page';

const routes: Routes = [
  {
    path: '',
    component: AccessLogsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessLogsDetailsPageRoutingModule {}
