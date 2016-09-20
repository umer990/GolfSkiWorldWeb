import {Component} from 'angular2/core'
import {googleMapService} from './googleMap.service'

@Component({
	selector:'googleMap',
	template:`
			<h2>Maps</h2>
			{{title}}
			
			`,
	providers:[googleMapService]
	
})

export class googleMapComponent{ 
title="Map loads here ";
courses;

constructor(courseService: googleMapService){
	this.courses=courseService.getMap();
}
}