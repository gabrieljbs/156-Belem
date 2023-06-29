import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
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

  async userRegister(user: any) {
    this.showLoading();
    await this.authService.register(user);
    this.loading.dismiss();
    this.router.navigate(['/login'])
  }

  async showLoading() {
   this.loading = await this.loadingCtrl.create();
    this.loading.present();
  }
}
