import {Component} from 'angular2/core'
import {googleMapComponent} from './googleMap.component'


@Component({
	selector:'landingPage',
	templateUrl:'app/landing.component.html',
	directives:[googleMapComponent]
	
})

export class LandingComponent{ 


PageName="This is Landing property"
}