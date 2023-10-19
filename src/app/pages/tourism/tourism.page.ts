import { Component, OnInit } from '@angular/core';
import { SolicitationService } from '../../services/solicitation.service';
import { StorageService } from '../../services/storage.service'
import { Router} from '@angular/router';
import { ModalController } from '@ionic/angular';
import { InfoTourismComponent } from './../../components/modals/info-tourism/info-tourism.component'
@Component({
  selector: 'app-tourism',
  templateUrl: './tourism.page.html',
  styleUrls: ['./tourism.page.scss'],
})
export class TourismPage implements OnInit {
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
    this.isLoading = true
    try {

      const info = await this.solicitation.info()
      info.forEach((doc) => {
          this.interfaceCard.push(doc.data())
          console.log(this.interfaceCard)
      });

      this.storage.getPontosTuristicos().subscribe((pontos)=>{
        this.interfaceTurismo = pontos;


        this.isLoading = false
      })
    } catch (error) {}
  }

  ticket(icon:string, name:string){
    this.router.navigate([`ticket`], {state:{icon:icon, name: name}});
  }
  async openModal(data:any) {
    const modal = await this.modalCtrl.create({
      component: InfoTourismComponent,
      componentProps: {
        data
      }
    });
    return await modal.present();

  }

}

