import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlacesPageRoutingModule } from './places-routing.module';
import { PlacesPage } from './places.page';
import { PagesPageModule } from '../pages.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlacesPageRoutingModule,
    PagesPageModule
  ],
  declarations: [PlacesPage]
})
export class PlacesPageModule {}
