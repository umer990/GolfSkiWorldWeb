




import {
  Component, ViewChild
} from '@angular/core';

import {bootstrap} from '@angular/platform-browser-dynamic';

import {
  MapTypeId, SebmGoogleMapMarker, SebmGoogleMap,
  ANGULAR2_GOOGLE_MAPS_PROVIDERS,
  ANGULAR2_GOOGLE_MAPS_DIRECTIVES
} from 'angular2-google-maps/core';


@Component({
  selector: 'adminPage',
    directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES, SebmGoogleMap, SebmGoogleMapMarker],
  styles: [`
    .sebm-google-map-container {
       height: 300px;
     }
     
     #ethiopian-desert {
       width: 40px;
       height: 40px;
       background-color: red;
    
     }
  `],
  template: `
  
  <sebm-google-map (mapClick)="mapClicked($event)" [latitude]="lat" [longitude]="lng" [zoom]="zoom">
    
        <sebm-google-map-marker [iconUrl]="location.iconUrl" *ngFor="let location of locations" [latitude]="location.lat" [longitude]="location.lng" [label]="location.id" (markerClick)="updateDiv(location, infowindow)">
            <sebm-google-map-info-window #infowindow [disableAutoPan]="true">{{ location.id }} {{ location.content }}</sebm-google-map-info-window>
        </sebm-google-map-marker>
   
</sebm-google-map>

  <section *ngIf="isClicked" id="ethiopian-desert">
    <div *ngIf="selectedLocation" class="result-number">
      {{ selectedLocation.id }}
  </div>
  </section>
`})
export class AdminComponent{
PageName="This is Landing property"

  
  lat: number = 51.5239935252832;
  lng: number = 5.137663903579778;
  zoom: number = 16;
  isClicked: boolean;
  selectedLocation: Location;
  lastClicked: SebmGoogleMapInfoWindow;
  
  locations = [
    {id: 1,  lat: 51.5239935252832,    lng:  5.137663903579778,   content: 'Kids Jungalow (5p)'},
    {id: 2,  lat: 51.523853342911906,  lng:  5.1377765563584035,  content: 'Kids Jungalow (5p)'},
    {id: 3,  lat: 51.5237298485607,    lng:  5.137969675407476,   content: 'Kids Jungalow (5p)'},
    {id: 4,  lat: 51.52355628836575,   lng:  5.138066234932012,   content: 'Kids Jungalow (5p)'},
    {id: 5,  lat: 51.52340275379578,   lng:  5.138211074218816,   content: 'Kids Jungalow (5p)'},
    {id: 6,  lat: 51.523199152806626,  lng:  5.138382735595769,   content: 'Kids Jungalow (5p)'},
    {id: 7,  lat: 51.5229955509073,    lng:  5.138511481628484,   content: 'Kids Jungalow (5p)'},
    {id: 8,  lat: 51.52280529912936,   lng:  5.138543668136663,   content: 'Kids Jungalow (5p)'},
    {id: 9,  lat: 51.523596340777075,  lng:  5.138463201866216,   content: 'Kids Jungalow (5p)'},
    {id: 700,lat: 51.523372714362736,  lng:  5.1386992362595265,  content: 'Kids Jungalow (5p)'},
    {id: 101, lat: 51.52329594683302,  lng:  5.138838711128301,   content: 'Kids Jungalow Giraffe'}
  ];
  
  updateDiv(location: Location, infoWindow) {
    this.selectedLocation = location;
    this.isClicked = true;
    this.ID = location.id;
    this.content = location.content;
    
    $(() => {
    $('.gm-style-iw').parent().append(
      '<div class="test">'+
        '<span class="content">'+
          '<span class="ID">'+ this.ID + '</span>'+
          '<span class="content-infowindow">' + this.content + '</span>'+
        '</span></div>');
    });

    if (this.lastClicked && this.lastClicked !== infoWindow){
         this.lastClicked.close();
    }
    this.lastClicked = infoWindow;
  }
  
  mapClicked($event: MouseEvent) {
    this.isClicked = false;
    if(this.lastClicked) {
       this.lastClicked.close();
       this.lastClicked = null;
    }
  }

}

// ANGULAR2_GOOGLE_MAPS_PROVIDERS is required here
//bootstrap(App, [ANGULAR2_GOOGLE_MAPS_PROVIDERS])
