import { Component, OnInit } from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';
@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    const map = new Map('map').setView([-1.45502, -48.5024], 13);


    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    map.locate({setView:true , maxZoom:16})

    function onLocationFound(e:any) {
      const radius = e.accuracy;

      marker(e.latlng).addTo(map)
          .bindPopup("Voçê a " + radius + " metros aproximadamente").openPopup();
  }

  map.on('locationfound', onLocationFound);

  }


}



