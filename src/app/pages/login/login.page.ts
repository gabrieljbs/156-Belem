import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { presentToast } from 'src/app/shared/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user = {
    email: '',
    password: '',
  };
  private loading: any;
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {}

  async login(user: any) {
    try {
      this.showLoading();
      await this.authService.login(user);
      this.loading.dismiss();
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.loading.dismiss();
      return (await presentToast(error.message, 3000, 'bottom', 'danger')).present();
    }
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create();
    this.loading.present();
  }
}
