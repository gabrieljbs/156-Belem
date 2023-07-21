import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-solicitation-details',
  templateUrl: './solicitation-details.component.html',
  styleUrls: ['./solicitation-details.component.scss'],
})
export class SolicitationDetailsComponent  implements OnInit {
  @Input() data: any;

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }
  ngOnInit() {
  }

}
