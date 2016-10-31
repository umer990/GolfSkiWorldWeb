import {Component} from '@angular/core'
import {MouseEvent} from 'angular2-google-maps/core';
import {GOOGLE_MAPS_PROVIDERS,GOOGLE_MAPS_DIRECTIVES,AgmCoreModule} from 'angular2-google-maps/core';
import {Router,ActivatedRoute, NavigationExtras} from '@angular/router';


import {Coordinates } from './coordinate';

import {InfoWindow} from './InfoWindow';
import {LocationService} from './googleMap.service';

@Component({
	selector:'googleMap',
	directives: [GOOGLE_MAPS_DIRECTIVES,AgmCoreModule],
	styleUrls: ['app/googleMap.component.css'],
	templateUrl: 'app/googleMap.component.html',
	providers:[LocationService]
})

export class googleMapComponent{ 
title="Map loads here ";
map;
constructor(private router: Router,
         private route: ActivatedRoute,
      private geoService: LocationService) {}

    ngOnInit(): void {
        this.getCurrentService();
    }


// get User Location according to IP address
    getCurrentService(): void {
        let zoomlevel = this.zoom;
      
     

        this.geoService.getCurrentLocation()
            .subscribe(
                location => {
                    this.baseLat = this.geoService.split(location, 0);
                    this.baseLng = this.geoService.split(location, 1);
                },
                error => this.errorMessage = error);
         // get all the resorts through the rest services   
        this.geoService.getGolfResorts().subscribe(
            res => {
                    var items: Array < Coordinates > = new Array < Coordinates > ();
                   
                      for(var i = 0; i < res.length; i++){
                        res[i].iconUrl="../img/icon_golf.png"
                         items.push(res[i]);
                      }
                                    this.coordinatesList = items;
                                    this.fillCoordinatesTobeShown(items);
                                    console.log(items); 
                       this.geoService.getSkiResorts().subscribe(
                            res => {
                                    for(var i = 0; i < res.length; i++){
                                        res[i].iconUrl="../img/icon_ski.png"
                                         items.push(res[i]);
                                      }
                                    this.coordinatesList = items;
                                    this.fillCoordinatesTobeShown(items);
                                    console.log(items); 
                                      },
                            error => this.errorMessage = error);
                     
                                        
                    
            },
            error => this.errorMessage = error);
    }

    // if we use navigator.geolocation to get user Location
/*
      fillUserLocation(position:any){
       this.baseLat = position.coords.latitude;
       this.baseLng = position.coords.longitude;
       console.log("coord"+this.baseLat+"  "+this.baseLng); 
    }*/

    



    fillCoordinatesTobeShown(coordinatesList: Array < Coordinates > ) { 
        let coordinatesTobeShown = new Array < Coordinates > ();
        if(coordinatesList!=null){
        for (let a of coordinatesList) {
            
                if (this.zoom <= a.zoomMax && this.zoom >= a.zoomMin) {
                    coordinatesTobeShown.push(a);
                }
            
        }
        this.coordinatesTobeShown = coordinatesTobeShown;
        console.log(this.coordinatesTobeShown);
    }
    }


    // change the base Location when use click on the map
    mapClicked($event: MouseEvent) {
     
        this.baseLat = $event.coords.lat;
        this.baseLng = $event.coords.lng;
        
        console.log("coord"+this.baseLat+"  "+this.baseLng);

    }



// when the zoom level is changed, different coords should be shown
    zoomChange($event: number) {
        console.log($event);
        this.zoom = $event;
        if (this.searchValue == "") {
            this.fillCoordinatesTobeShown(this.coordinatesList);
        } else {
            this.fillCoordinatesTobeShown(this.searchAggResults);
        }

    }

    //launch to the deatil page with coords

    gotoDetail(lat:string,lng:string): void {

     let navigationExtras: NavigationExtras = {
      queryParams: { 'lat': lat,'lng':lng },
      
    };
  
    this.router.navigate(['/resort'], navigationExtras);
       
    }

// show the markers in the google map base on the value in the search box
    onSearch(value: string) { 
        console.log(value);
        this.searchValue = value;
        if (this.searchValue == "") {
            this.fillCoordinatesTobeShown(this.coordinatesList);
            this.searchResults = null;
        } else {
            let searchResults = new Array < Coordinates > ();
            for (let a of this.coordinatesList) {
                if (a.zoomMin >= 9) {
                    let infoWindow: InfoWindow = a.infoWindow;
                    if (infoWindow.name.indexOf(value) != -1 ||
                        infoWindow.address.indexOf(value) != -1 ||
                        infoWindow.shortDiscription.indexOf(value) != -1 ||
                        infoWindow.telNo.indexOf(value) != -1 ||
                        a.type.indexOf(value) != -1 ||
                        a.country.indexOf(value) != -1 ||
                        a.city.indexOf(value) != -1) {
                        searchResults.push(a);
                    }
                }
            }
            this.searchResults = searchResults;
            console.log(searchResults);
            this.searchAggResults = this.geoService.aggreateCoordinates(searchResults);
            this.fillCoordinatesTobeShown(this.searchAggResults);

        }
    }

 selectedMarker ;
    coordinatesList: Array < Coordinates > ;
    coordinatesTobeShown: Array < Coordinates > ;
    searchResults: Array < Coordinates > ;
    searchAggResults: Array < Coordinates > ;
    searchValue: string = "";
    baseLat: number;
    baseLng: number;
    isOpen:boolean;
    zoom: number = 4;
    errorMessage: string = null;






   
 
  isClicked: boolean;
  selectedLocation: Location;
  lastClicked: SebmGoogleMapInfoWindow;
  

  
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
  
  mapClicked1($event: MouseEvent) {
  this.baseLat = $event.coords.lat;
  this.baseLng = $event.coords.lng;
   

    this.isClicked = false;
    if(this.lastClicked) {
       this.lastClicked.close();
       this.lastClicked = null;
    }
  }
 mapClicked($event: MouseEvent) {
     
        this.baseLat = $event.coords.lat;
        this.baseLng = $event.coords.lng;
        
        console.log("coord"+this.baseLat+"  "+this.baseLng);

    }

}