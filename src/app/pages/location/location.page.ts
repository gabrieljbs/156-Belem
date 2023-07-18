import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Map, latLng, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  private latitude: any;
  private longitude: any;
  constructor(
    private router: Router
  ) {}

  ngOnInit() {

  }

  ngAfterViewInit(): void {

    const map = new Map('map').setView([-1.45502, -48.5024], 13);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    map.locate({ setView: true, maxZoom: 16 });

    const onLocationFound = (e: any) => {
      const radius = e.accuracy;
       this.latitude = e.latlng.lat;
       this.longitude = e.latlng.lng;



      console.log(this.latitude,this.longitude)

      marker(e.latlng)
        .addTo(map)
        .bindPopup("Você está a " + radius + " metros aproximadamente")
        .openPopup();
    }

    map.on('locationfound', onLocationFound);
  }

  nextPage(){
    try{

      this.router.navigate(['/ticket'], {
        queryParams:{ latitude: this.latitude, longitude: this.longitude }});

    }
    catch(err){
      console.log('Erro',err);
    }
  }


}
