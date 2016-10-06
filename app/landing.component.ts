import { Component } from '@angular/core';
import {googleMapComponent} from './googleMap.component'
import {moviesComponent} from './movies.component'
import {HeaderComponent} from './common/header.component';





@Component({
	selector:'landingPage',
	templateUrl:'app/landing.component.html',
	directives:[googleMapComponent,moviesComponent,HeaderComponent]
	
})

export class LandingComponent{
PageName="This is Landing property"
}