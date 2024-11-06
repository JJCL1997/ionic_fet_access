import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorRegistrationPageRoutingModule } from './visitor-registration-routing.module';

import { VisitorRegistrationPage } from './visitor-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorRegistrationPageRoutingModule
  ],
  declarations: [VisitorRegistrationPage]
})
export class VisitorRegistrationPageModule {}
