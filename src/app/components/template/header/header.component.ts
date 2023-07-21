import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private loading: any;
  @Input() public headerText =  '';
  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create();
    this.loading.present();
  }

  async redirect(route: string) {
    await this.router.navigate([`/${route}`]);
  }
}
