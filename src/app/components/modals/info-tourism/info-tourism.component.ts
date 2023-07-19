import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-info-tourism',
  templateUrl: './info-tourism.component.html',
  styleUrls: ['./info-tourism.component.scss'],
})
export class InfoTourismComponent  implements OnInit {
  @Input() data: any;
  public isLoading = false;
  constructor(private modalCtrl: ModalController) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }
  ngOnInit() {}

}
