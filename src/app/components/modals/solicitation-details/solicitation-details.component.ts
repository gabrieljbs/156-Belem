import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { SolicitationService} from './../../../services/solicitation.service';
@Component({
  selector: 'app-solicitation-details',
  templateUrl: './solicitation-details.component.html',
  styleUrls: ['./solicitation-details.component.scss'],
})
export class SolicitationDetailsComponent  implements OnInit {
  @Input() data: any;

  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private services: SolicitationService
    ) {}

    public alertButtons = [
      {
      text: 'Confirmar',
      role: 'confirm',
      handler: async() => {
        console.log(this.data)
        await this.services.delete(this.data.uid)
      },
    },, 'Cancelar'];

    public alertInputs = [
    {
      label: 'Me enganei',
      type: 'radio',
      value: 'Me enganei',
      handler: () => {
        console.log(this.alertInputs.values);
      },
    },
    {
      label: 'Já resolvido',
      type: 'radio',
      value: 'Já resolvido',
      handler: () => {
        console.log(this.alertInputs.values);
      },
    },
    {
      label: 'Localização errada',
      type: 'radio',
      value: 'Localização errada',
      handler: () => {
        console.log(this.alertInputs.values);
      },
    },
    {
      label: 'Foto errada',
      type: 'radio',
      value: 'Foto errada',
      handler: () => {
        console.log(this.alertInputs.values);
      },
    }
  ];

  ngOnInit() {
    console.log(this.data)
  }

  close(){
    this.modalCtrl.dismiss()
  }

}
