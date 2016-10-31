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

}