import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
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
      full_name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  }

  ngOnInit() {}

  async register() {
    try {
      if (this.userForm.value.password === this.userForm.value.confirmPassword) {
        this.showLoading();
        await this.authService.register(this.userForm.value);
        this.loading.dismiss();
        this.redirect('/login');
      }else if(this.userForm.value.password !== this.userForm.value.confirmPassword){
        this.presentToast('Senhas não conferem');
      }
    } catch (error: any) {
      console.log(error.message);
      this.loading.dismiss();
      return await this.presentToast(error.message);
    }
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create();
    this.loading.present();
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }

  async presentToast(e: string) {
    if (e === 'Firebase: Error (auth/invalid-email).') {
      this.error = 'Email invalido';
    } else if (e === 'Firebase: Error (auth/missing-password).') {
      this.error = 'Insira uma senha';
    } else if (e === 'Firebase: Error (auth/email-already-in-use).') {
      this.error = 'Email em uso';
    } else {
      this.error = e;
    }

    const toast = await this.toastController.create({
      message: this.error,
      duration: 7000,
      position: 'bottom',
      color: 'danger',
    });

    await toast.present();
  }
}
