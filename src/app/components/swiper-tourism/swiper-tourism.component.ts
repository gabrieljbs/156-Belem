import { Component, OnInit } from '@angular/core';
import { InfoTourismComponent } from './../../components/modals/info-tourism/info-tourism.component';
import { ModalController } from '@ionic/angular';
import { SolicitationService } from './../../services/solicitation.service';

@Component({
  selector: 'app-swiper-tourism',
  templateUrl: './swiper-tourism.component.html',
  styleUrls: ['./swiper-tourism.component.scss'],
})
export class SwiperTourismComponent implements OnInit {
  public interfaceS: any[] = [];
  public interfaceTurismo: any[] = [];
  public interfaceCard: any[] = [];
  public isLoading = false;
  constructor(
    private modalCtrl: ModalController,
    private solicitation: SolicitationService
  ) {}

  async ngOnInit() {
    try {
      this.isLoading = true;
      const slids = await this.solicitation.read();
      slids.forEach((doc) => {
        this.interfaceS.push(doc.data());
      });

      const info = await this.solicitation.info();
      info.forEach((doc) => {
        this.interfaceTurismo.push(doc.data());
        console.log(this.interfaceCard);
      });

      const buttom = await this.solicitation.card();
      buttom.forEach((doc) => {
        this.interfaceCard.push(doc.data());
      });

      this.isLoading = false;
    } catch (error) {}
  }

  async openModalTourism(data: any) {
    const modal = await this.modalCtrl.create({
      component: InfoTourismComponent,
      componentProps: {
        data,
      },
    });
    return await modal.present();
  }
}
