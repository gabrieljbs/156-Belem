import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SolicitationService } from 'src/app/services/solicitation.service';
import { SolicitationDetailsComponent } from 'src/app/components/modals/solicitation-details/solicitation-details.component';

@Component({
  selector: 'app-swiper-tickts',
  templateUrl: './swiper-tickts.component.html',
  styleUrls: ['./swiper-tickts.component.scss'],
})
export class SwiperTicktsComponent implements OnInit {
  public interfaceS: any[] = [];
  public result: any;
  public isLoading = false;

  constructor(
    private solicitation: SolicitationService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    try {
      this.isLoading = true;
      const slids = await this.solicitation.read();
      slids.forEach((doc) => {
        this.interfaceS.push(doc.data());
      });
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
    }
  }

  async openModalSolicitation(data: any) {
    const modal = await this.modalCtrl.create({
      component: SolicitationDetailsComponent,
      componentProps: {
        data,
      },
    });
    return await modal.present();
  }
}
