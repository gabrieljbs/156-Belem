import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-new-solicitation',
  templateUrl: './new-solicitation.page.html',
  styleUrls: ['./new-solicitation.page.scss'],
})
export class NewSolicitationPage implements OnInit {
  public interfaceCard: any[] = [];
  public results: string = '';
  public isLoading = false;
  constructor() {}

  ngOnInit() {}
  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = query;
  }
}
