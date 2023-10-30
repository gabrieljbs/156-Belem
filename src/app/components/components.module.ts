import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketsTypeComponent } from './tickets-type/tickets-type.component';
import { SwiperTourismComponent } from './swiper-tourism/swiper-tourism.component';
import { SwiperTicktsComponent } from './swiper-tickts/swiper-tickts.component';
import { SortByPipe } from '../shared/orderByPipe';
@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [
    TicketsTypeComponent,
    SwiperTourismComponent,
    SwiperTicktsComponent,
    SortByPipe
  ],
  exports: [
    TicketsTypeComponent,
    SwiperTourismComponent,
    SwiperTicktsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
