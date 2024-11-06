import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrVisitorPageRoutingModule } from './qr-visitor-routing.module';

import { QrVisitorPage } from './qr-visitor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrVisitorPageRoutingModule
  ],
  declarations: [QrVisitorPage]
})
export class QrVisitorPageModule {}
