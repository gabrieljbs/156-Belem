import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Control, Map, latLng, marker, tileLayer } from 'leaflet';
import 'leaflet-control-geocoder';
@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  public location: any  = {lat:'', lon:''}
  public icon:any;
  public name: any
  private state: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {

    this.state = this.router.getCurrentNavigation()?.extras?.state;
    this.icon = this.state.icon
    this.name = this.state.name
    console.log(this.state)
  }

  ngAfterViewInit(): void {

    const map = new Map('map').setView([-1.45502, -48.5024], 13);
    tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {

    }).addTo(map);


    map.locate();

    const onLocationFound = (e: any) => {
      const radius = e.accuracy;
      this.location.lat = e.latlng.lat;
      this.location.lon = e.latlng.lng;
      console.log(this.location.lat,this.location.lon)

      marker(e.latlng)
      .addTo(map)
      .bindPopup("Você está a " + radius + " metros aproximadamente")
      .openPopup();
    }

    map.on('locationfound', onLocationFound);


  }

  ticket(){
    this.router.navigate([`ticket`], {state:{icon:this.state.icon, name: this.state.name, lat:this.location.lat, lon:this.location.lon}});
  }


}
