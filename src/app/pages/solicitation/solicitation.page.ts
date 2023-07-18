import { Component, OnInit } from '@angular/core';
import { SolicitationService } from 'src/app/services/solicitation.service';
import { getAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-solicitation',
  templateUrl: './solicitation.page.html',
  styleUrls: ['./solicitation.page.scss'],
})
export class SolicitationPage implements OnInit {
  public interfaceList: any[] = [];

  filter = 'Em andamento'
  constructor(
    private list: SolicitationService,

  ) {}

  async ngOnInit() {
    const w = await this.list.read();
    w.forEach((doc) => {
      this.interfaceList.push(doc.data());
    });
  }
}
