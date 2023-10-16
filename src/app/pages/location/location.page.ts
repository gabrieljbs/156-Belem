import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet.locatecontrol';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  public input: any;
  public icon: any;
  public name: any;
  private state: any;
  private location: any = {lat:'',lng:''};
  private local: any;

  constructor(
    private router: Router,
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
      "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    ).addTo(map);

    const searchControl = GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      style: 'bar',
      position: 'topleft',
      searchLabel: this.local ? this.local : 'Insira o endereço...',
      notFoundMessage: 'Desculpa, endereço não encontrado.',
      showMarker: false,
      showPopup: false,
    });
    map.addControl(searchControl).getCenter();

    const searchEventHandler = (result: any) => {
    };

    map.on('geosearch/showlocation', searchEventHandler);
    L.control
      .locate({
        position: 'topleft',
        drawCircle: true

      })
      .addTo(map);

      let currentMarker:any = null;

      map.on('click', (e) => {
        this.location.lat = e.latlng.lat
        this.location.lng = e.latlng.lng
        console.log(this.location)
        if (currentMarker) {
          map.removeLayer(currentMarker);
        }
        currentMarker = L.marker(this.location).addTo(map);
      });
  }

  ticket() {
    if (this.location.lat! || this.location.lng!) {
      this.router.navigate([`ticket`], {
        state: {
          icon: this.state.icon,
          name: this.state.name,
          lat: this.location.lat,
          lon: this.location.lng,
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
