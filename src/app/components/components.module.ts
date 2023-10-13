import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketsTypeComponent } from './tickets-type/tickets-type.component';
@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [TicketsTypeComponent],
  exports: [TicketsTypeComponent],
})
export class ComponentsModule {}
