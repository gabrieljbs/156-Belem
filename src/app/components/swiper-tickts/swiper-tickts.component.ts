import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public isLoading = false;
  public interfaceCard: any[] = [];

  constructor(private solicitation: SolicitationService,private router: Router, private modalCtrl: ModalController) {}

  async ngOnInit() {
    try {
      this.isLoading = true;
      const slids = await this.solicitation.read();
      slids.forEach((doc) => {
        this.interfaceS.push(doc.data());
      });
      const buttom = await this.solicitation.card();
      buttom.forEach((doc) => {
        this.interfaceCard.push(doc.data());
      });

      this.isLoading = false;
    } catch (error) {}
  }

  async openModalSolicitation(data:any) {
    const modal = await this.modalCtrl.create({
      component: SolicitationDetailsComponent,
      componentProps: {
        data
      }
    });
    return await modal.present();

  }
}
