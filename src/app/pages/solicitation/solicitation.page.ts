import { Component, OnInit } from '@angular/core';
import { SolicitationService } from 'src/app/services/solicitation.service';
import { getAuth } from '@angular/fire/auth';
import { SolicitationDetailsComponent } from 'src/app/components/modals/solicitation-details/solicitation-details.component';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-solicitation',
  templateUrl: './solicitation.page.html',
  styleUrls: ['./solicitation.page.scss'],
})
export class SolicitationPage implements OnInit {
  public interfaceList: any[] = [];
  public interfaceListResult: any;
  constructor(
    private solicitation: SolicitationService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {

    const w = await this.solicitation.read();
    w.forEach((doc) => {
      this.interfaceList.push(doc.data());
    });

    this.interfaceList.map((res:any)=>{
      if(res.status ==='Em analise' || res.status === 'Em andamento'){
        Object.assign(res,{color:'#FFD700'})
      }else if(res.status === 'Concluido'){
        Object.assign(res,{color:'#008000'})
      }else if(res.status === 'Aberto'){
        Object.assign(res,{color:'#7301b1'})
      }else{
        Object.assign(res,{color:'#FF0000'})
      }
    })


    this.interfaceListResult = this.interfaceList.filter((el: any) => {
      return el.status === 'Aberto' || el.status === 'Em analise' || el.status === 'Em andamento';
    });


  }

  async openModal(data: any) {
    const modal = await this.modalCtrl.create({
      component: SolicitationDetailsComponent,
      componentProps: {
        data,
      },
    });
    return await modal.present();
  }

  eventClick(e: any) {
    if (e.detail.value === 'Aberto') {
      this.interfaceListResult = this.interfaceList.filter((el: any) => {

        return el.status === 'Aberto' || el.status === 'Em analise' || el.status === 'Em andamento';
      });
    } else if (e.detail.value === 'Fechado') {
      this.interfaceListResult = this.interfaceList.filter((el: any) => {

        return el.status === 'Concluido' || el.status === 'Cancelado';
      });
    }
  }

}
