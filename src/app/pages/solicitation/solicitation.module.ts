import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitationPageRoutingModule } from './solicitation-routing.module';

import { SolicitationPage } from './solicitation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitationPageRoutingModule
  ],
  declarations: [SolicitationPage]
})
export class SolicitationPageModule {}
