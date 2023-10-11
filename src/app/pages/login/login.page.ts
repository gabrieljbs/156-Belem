import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { presentToast } from 'src/app/shared/toast';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userForm: FormGroup;
  private loading: any;
  public error: string = '';
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {
    this.userForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit() {}

  async login() {
    try {
      this.showLoading();
      await this.authService.login(this.userForm.value);
      this.loading.dismiss();
      this.redirect('home');
    } catch (error: any) {
      this.loading.dismiss();
      return await this.presentToast(error.message);
    }
  }

  async presentToast(e: string) {
    if (e === 'Firebase: Error (auth/invalid-email).') {
      this.error = 'Email é inválido';
    } else if (e === 'Firebase: Error (auth/wrong-password).') {
      this.error = 'Senha incorreta';
    }

    const toast = await this.toastController.create({
      message: this.error,
      duration: 7000,
      position: 'bottom',
      color: 'danger',
    });

    await toast.present();
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create();
    this.loading.present();
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }
}
