import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import { presentToast } from 'src/app/shared/toast';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public user = {
    email: '',
    password: '',
    nome: '',
    confirmPassword: '',
  };
  private loading: any;
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {}

  async userRegister(user: any) {
    if (this.user.password !== this.user.confirmPassword)
      return (
        await presentToast('Senhas não conferem', 3000, 'bottom', 'danger')
      ).present();
    this.showLoading();
    try {
      await this.authService.register(user);
      this.loading.dismiss();
      this.router.navigate(['/login']);
    } catch (err: any) {
      this.loading.dismiss();
      return (
        await presentToast('Senhas não conferem', 3000, 'bottom', 'danger')
      ).present();
    }
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create();
    this.loading.present();
  }
}
