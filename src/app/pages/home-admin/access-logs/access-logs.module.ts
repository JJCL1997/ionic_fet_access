import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccessLogsPageRoutingModule } from './access-logs-routing.module';

import { AccessLogsPage } from './access-logs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccessLogsPageRoutingModule
  ],
  declarations: [AccessLogsPage]
})
export class AccessLogsPageModule {}
