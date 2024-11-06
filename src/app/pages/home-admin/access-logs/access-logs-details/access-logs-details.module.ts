import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccessLogsDetailsPageRoutingModule } from './access-logs-details-routing.module';

import { AccessLogsDetailsPage } from './access-logs-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccessLogsDetailsPageRoutingModule
  ],
  declarations: [AccessLogsDetailsPage]
})
export class AccessLogsDetailsPageModule {}
