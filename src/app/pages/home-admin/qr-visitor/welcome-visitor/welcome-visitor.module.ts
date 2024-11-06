import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomeVisitorPageRoutingModule } from './welcome-visitor-routing.module';

import { WelcomeVisitorPage } from './welcome-visitor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomeVisitorPageRoutingModule
  ],
  declarations: [WelcomeVisitorPage]
})
export class WelcomeVisitorPageModule {}
