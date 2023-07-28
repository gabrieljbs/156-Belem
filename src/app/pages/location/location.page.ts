import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  public location: any = { lat: '', lon: '' };
  public icon: any;
  public name: any;
  private state: any;
  private result: any = null;
  private mc: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.state = this.router.getCurrentNavigation()?.extras?.state;
    this.icon = this.state.icon;
    this.name = this.state.name;
  }

  ngAfterViewInit(): void {
    const map = L.map('map').setView([-1.45502, -48.5024], 16);
    L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    ).addTo(map);
    const searchControl = GeoSearchControl(
      {
        provider: new OpenStreetMapProvider(),
        style: 'bar',
        searchLabel: 'Insira o endereço...',
        notFoundMessage: 'Desculpa, endereço não encontrado.',
      },
    );

    map.addControl(searchControl).getCenter();

    //map.locate();

    // actual location
    // const onLocationFound = (e: any) => {
    //   const radius = e.accuracy;
    //   this.location.lat = e.latlng.lat;
    //   this.location.lon = e.latlng.lng;
    //   L.marker(e.latlng)
    //     .addTo(map)
    //     .bindPopup('Você está a ' + radius + ' metros aproximadamente')
    //     .openPopup();
    // };
    // map.on('locationfound', onLocationFound);

    const searchEventHandler = (result: any) => {
      this.result = result.location;
    };
    // Funcionando
    map.on('geosearch/showlocation', searchEventHandler);

    const markerOption = {
      draggable: false,
    };

  }

  ticket() {
    if (this.result) {
      this.router.navigate([`ticket`], {
        state: {
          icon: this.state.icon,
          name: this.state.name,
          lat: this.result.y,
          lon: this.result.x,
          label: this.result.label,
        },
      });
    } else {
      this.presentToast();
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Informe a localização',
      duration: 3000,
      position: 'bottom',
      color: 'danger',
    });

    await toast.present();
  }
}
