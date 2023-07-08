import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SolicitationPageRoutingModule } from './solicitation-routing.module';
import { SolicitationPage } from './solicitation.page';
import { PagesPageModule } from '../pages.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitationPageRoutingModule,
    PagesPageModule

  ],
  declarations: [SolicitationPage,]
})
export class SolicitationPageModule {}
