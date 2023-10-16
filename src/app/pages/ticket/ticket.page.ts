import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { SolicitationService } from 'src/app/services/solicitation.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { presentToast } from 'src/app/shared/toast';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {
  public imageSrc: any;
  public loading: any;
  public location: any = { lat: '', lon: '' };
  public description = '';
  private state: any;
  public name: any;
  public icon: any;
  private uid = '';
  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    private solicitation: SolicitationService,
    private storageService: StorageService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    this.uid = this.authService.getuid();

  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create();
    this.loading.present();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });
    const imageUrl = image.webPath;
    this.imageSrc = imageUrl;
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} Caracteres`;
  }

  async ticket(descricao: string, input: any) {
    this.showLoading();
    try {
      const imageRef = await this.storageService.setFiles(input);
      await this.solicitation.create({
        uid: this.uid,
        descricao: descricao,
        latitude: this.state.lat,
        longitude: this.state.lon,
        icon: this.state.icon,
        name: this.state.name,
        url: imageRef,
        label: this.state.label,
      });
      this.loading.dismiss();
      this.router.navigate(['/solicitation']);
    } catch (err: any) {
      this.loading.dismiss();
      return (
        await presentToast(err.message, 30000, 'bottom', 'danger')
      ).present();
    }
  }

  async handleFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (file.type.startsWith('image/')) {
        this.showImagePreview(file);
      } else if (file.type.startsWith('video/')) {
        this.showVideoPreview(file);
      }
    }
  }

  showImagePreview(file: File) {
    const reader = new FileReader();

    reader.onload = (event) => {
      this.imageSrc = (event.target as FileReader).result;
    };

    reader.readAsDataURL(file);
  }

  showVideoPreview(file: File) {
    const reader = new FileReader();

    reader.onload = (event) => {
      this.imageSrc = (event.target as FileReader).result;
    };

    reader.readAsDataURL(file);
  }
}
