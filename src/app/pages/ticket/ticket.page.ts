import { Component, Input, OnInit, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { SolicitationService } from 'src/app/services/solicitation.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {
  public imageSrc: any;
  private readonly storage: Storage = inject(Storage);
  private loading: any;
  public location: any  = {lat:'', log:''}
  public description = 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'

  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    private solicitation: SolicitationService,
  ) { }


  ngOnInit() {
    this.route.queryParamMap
      .subscribe((params)=>{
        this.location.lat  = params.get('latitude')
        this.location.log  = params.get('longitude')
      })

      console.log(this.location.lat,this.location.log)
  }


  async uploadFile(input: HTMLInputElement) {
    this.showLoading();
    if (!input.files) return

    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file) {
            const storageRef = ref(this.storage, file.name);
            await uploadBytesResumable(storageRef, file);
        }
    }
    this.loading.dismiss();
    this.router.navigate(['/home'])
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create();
     this.loading.present();
   }

   async takePicture() {
    console.log('takePicture')
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    const imageUrl = image.webPath;
    this.imageSrc = imageUrl;
  };

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} Caracteres`;
  }

  chamar(){
    this.solicitation.create()
  }
}
