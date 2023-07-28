import { Component, OnInit } from '@angular/core';
import { SolicitationService } from 'src/app/services/solicitation.service';
import { getAuth } from '@angular/fire/auth';
import { SolicitationDetailsComponent } from 'src/app/components/modals/solicitation-details/solicitation-details.component';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-solicitation',
  templateUrl: './solicitation.page.html',
  styleUrls: ['./solicitation.page.scss'],
})
export class SolicitationPage implements OnInit {
  public interfaceList: any[] = [];
  public uid = '';
  filter = 'Em andamento'
  constructor(
    private solicitation: SolicitationService,
    private modalCtrl: ModalController,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.uid = await this.authService.getuid();
    const w = await this.solicitation.read(this.uid);
    w.forEach((doc) => {
      this.interfaceList.push(doc.data());
    });
  }

  async openModal(data:any) {
    const modal = await this.modalCtrl.create({
      component: SolicitationDetailsComponent,
      componentProps: {
        data
      }
    });
    return await modal.present();

  }
}
