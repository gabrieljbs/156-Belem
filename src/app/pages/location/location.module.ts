import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LocationPageRoutingModule } from './location-routing.module';
import { LocationPage } from './location.page';
import { PagesPageModule } from '../pages.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationPageRoutingModule,
    PagesPageModule
  ],
  declarations: [LocationPage,],
  exports:[]
})
export class LocationPageModule {}
