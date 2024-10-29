import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeVigilantPageRoutingModule } from './home-vigilant-routing.module';

import { HomeVigilantPage } from './home-vigilant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeVigilantPageRoutingModule
  ],
  declarations: [HomeVigilantPage]
})
export class HomeVigilantPageModule {}
