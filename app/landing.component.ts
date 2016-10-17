import { Component } from '@angular/core';
import {googleMapComponent} from './googleMap.component'
import {moviesComponent} from './movies.component'





@Component({
	selector:'landingPage',
	templateUrl:'app/landing.component.html',
	directives:[googleMapComponent,moviesComponent]
	
})

export class LandingComponent{
PageName="This is Landing property"
}