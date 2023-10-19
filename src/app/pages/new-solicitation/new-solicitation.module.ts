import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewSolicitationPageRoutingModule } from './new-solicitation-routing.module';
import { NewSolicitationPage } from './new-solicitation.page';
import { HomePageRoutingModule } from '../home/home-routing.module';
import { PagesPageModule } from '../pages.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewSolicitationPageRoutingModule,
    HomePageRoutingModule,
    PagesPageModule,
    ComponentsModule
  ],
  declarations: [NewSolicitationPage]
})
export class NewSolicitationPageModule {}
