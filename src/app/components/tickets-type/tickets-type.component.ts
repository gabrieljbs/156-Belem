import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitationService } from 'src/app/services/solicitation.service';

@Component({
  selector: 'app-tickets-type',
  templateUrl: './tickets-type.component.html',
  styleUrls: ['./tickets-type.component.scss'],
})
export class TicketsTypeComponent implements OnInit {
  public interfaceCard: any[] = [];
  @Input() search:any;
  public results:any [] = [];
  public isLoading = false;
  constructor(
    private solicitation: SolicitationService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.isLoading = true;
      const buttom = await this.solicitation.card();
      buttom.forEach((doc) => {
        this.interfaceCard.push(doc.data());
      });
      this.results = [...this.interfaceCard];
      this.isLoading = false;
    } catch (error) {}
  }

  ticket(icon: string, name: string) {
    this.router.navigate([`location`], { state: { icon: icon, name: name } });
  }
}
