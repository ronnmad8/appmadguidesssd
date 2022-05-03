import { Component, AfterViewInit  } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  private map;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 40.503327021253405, -3.892205388669462 ],
      zoom: 17
    });


    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      minZoom: 17,
      zoomControl: false,
      scrollWheelZoom: false,
      touchZoom: false,
      doubleClickZoom: false,
      resize: false,
      dragging: false,
      keyboard: false,
      interactive: false,
      fitBounds: false,
      renderer: false,
      fillcolor: '#656565'
      
    });

    var xicon = L.icon ({ 
      iconUrl:"https:\/\/proyectosxanadu.es\/assets\/images\/logoxanadunegro.png",
      iconSize: [140,40],
      iconAnchor: [-4,25],
      popupAnchor: [8,-25]
    });

    var marker = L.marker(
      [40.503327021253405, -3.892205388669462],
      { icon: xicon }
    );

    marker.addTo( this.map )
    .bindPopup('¡Ven a visitarnos!')
    .openPopup();

      

    tiles.addTo(this.map);
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
