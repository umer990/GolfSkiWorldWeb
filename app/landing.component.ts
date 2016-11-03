import { Component } from '@angular/core';
import {googleMapComponent} from './googleMap.component'
import {moviesComponent} from './movies.component'
import {dealsComponent} from './deals.component'

@Component({
	selector:'landingPage',
	templateUrl:'app/landing.component.html',
	directives:[googleMapComponent,moviesComponent,dealsComponent]
	
})

export class LandingComponent{
private mapStatus:boolean=false;
private mapLink:string="Open Map";
private showMap(){
    if(!this.mapStatus)
    {
        this.mapStatus=true;
        this.mapLink="Close Map"
    }
	else{
		this.mapStatus=false;
        this.mapLink="Open Map"

	}
}
}