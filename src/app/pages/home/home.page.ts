import { Component, OnInit, ViewChild } from '@angular/core';
import { SolicitationService } from './../../services/solicitation.service';
import { StorageService } from './../../services/storage.service';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { SolicitationDetailsComponent } from 'src/app/components/modals/solicitation-details/solicitation-details.component';
import { InfoTourismComponent } from './../../components/modals/info-tourism/info-tourism.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('popover') popover: any;
  public interfaceS: any[] = [];
  public isLoading = false;
  public interfaceCard: any[] = [];
  public interfaceTurismo: any[] = [];
  public isOpen = true;
  constructor(
    private solicitation: SolicitationService,
    private storage: StorageService,
    private router: Router,
    private modalCtrl: ModalController,
    public popoverController: PopoverController
  ) {}

  async ngOnInit() {
    try {
      this.isLoading = true;
      const slids = await this.solicitation.read();
      slids.forEach((doc) => {
        this.interfaceS.push(doc.data());
      });
      this.interfaceS.push({
        titulo: 'Solicitações',
        subtitulo: 'Clique para ver todas',
        func: true,
      });
      console.log(this.interfaceCard);
      const info = await this.solicitation.info();
      info.forEach((doc) => {
        this.interfaceTurismo.push(doc.data());
        console.log(this.interfaceCard);
      });
      this.interfaceTurismo.push({
        text: 'Pontos turisticos',
        titulo: 'Clique para ver todos',
      });

      // for(let i = 0; i<100 ; i++) {
      //   this.interfaceCard.push(i)
      // }
      const buttom = await this.solicitation.card();
      buttom.forEach((doc) => {
        this.interfaceCard.push(doc.data());
      });

      this.isLoading = false;
    } catch (error) {}
  }

  ticket(icon: string, name: string) {
    this.router.navigate([`location`], { state: { icon: icon, name: name } });
  }

  async openModalSolicitation(data: any) {
    if (data.func) {
      return await this.router.navigate(['/solicitation']);
    }
    const modal = await this.modalCtrl.create({
      component: SolicitationDetailsComponent,
      componentProps: {
        data,
      },
    });
    return await modal.present();
  }
  async openModalTourism(data: any) {
    if (data.func) {
      return await this.router.navigate(['/tourism']);
    }
    const modal = await this.modalCtrl.create({
      component: InfoTourismComponent,
      componentProps: {
        data,
      },
    });
    return await modal.present();
  }

  async search(query: any) {
    console.log(query.detail.value);
    const result = this.interfaceCard.includes(
      (res: any) => res.name === query.detail.value
    );
  }

  async redirect(route: string) {
    await this.router.navigate([`/${route}`]);
  }
}
