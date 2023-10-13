import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitationService } from 'src/app/services/solicitation.service';

@Component({
  selector: 'app-new-solicitation',
  templateUrl: './new-solicitation.page.html',
  styleUrls: ['./new-solicitation.page.scss'],
})
export class NewSolicitationPage implements OnInit {
  public interfaceCard: any[] = [];
  public results:any ='';
  public isLoading = false;
  constructor(
    private solicitation: SolicitationService,
    private router: Router,
    ) { }

  ngOnInit() {
  }
  handleInput(event:any) {
    const query = event.target.value.toLowerCase();
    //this.results = this.interfaceCard.filter((d) => d.name.toLowerCase().indexOf(query) > -1);
  }
}
