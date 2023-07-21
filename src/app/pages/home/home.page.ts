import { Component, OnInit } from '@angular/core';
import { SolicitationService } from './../../services/solicitation.service';
import { StorageService } from './../../services/storage.service'
import { Router} from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SolicitationDetailsComponent } from 'src/app/components/modals/solicitation-details/solicitation-details.component';
import { InfoTourismComponent } from './../../components/modals/info-tourism/info-tourism.component'
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public interfaceS: any[] = [];
  public isLoading = false;
  public interfaceCard: any[] = [];
  public interfaceTurismo: any[] = [];

  constructor(
    private solicitation: SolicitationService,
    private storage: StorageService,
    private router: Router,
    private modalCtrl: ModalController
    ) {}

  async ngOnInit() {
    try {
      this.isLoading = true
      const slids = await this.solicitation.read();
      slids.forEach((doc) => {
        this.interfaceS.push(doc.data());
      });

      const info = await this.solicitation.info()
      info.forEach((doc) => {
          this.interfaceTurismo.push(doc.data())
          console.log(this.interfaceCard)
      });

      const buttom = await this.solicitation.card();
      buttom.forEach((doc)=>{this.interfaceCard.push(doc.data())})

      this.isLoading = false
    } catch (error) {}
  }

  ticket(icon:string, name:string){
    this.router.navigate([`location`], {state:{icon:icon, name: name}});
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
  async openModalTourism(data:any) {
    const modal = await this.modalCtrl.create({
      component: InfoTourismComponent,
      componentProps: {
        data
      }
    });
    return await modal.present();

  }
}

