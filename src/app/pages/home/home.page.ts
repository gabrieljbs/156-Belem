import { Component, OnInit, inject } from '@angular/core';
import { SolicitationService } from './../../services/solicitation.service';
import { StorageService } from './../../services/storage.service'
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
    private storage: StorageService
    ) {}

  async ngOnInit() {
    try {
      this.isLoading = true
      const slids = await this.solicitation.read();
      slids.forEach((doc) => {
        this.interfaceS.push(doc.data());
      });

      const buttom = await this.solicitation.card();
      buttom.forEach((doc)=>{this.interfaceCard.push(doc.data())})

      this.storage.getPontosTuristicos().subscribe((pontos)=>{
        this.interfaceTurismo = pontos;
      })

      this.isLoading = false


    } catch (error) {}



  }
}

